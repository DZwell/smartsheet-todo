const smartsheet = require('./rawSmartsheetClient');
const sheetId = require('../../config.json').SHEET_ID;

if (!process.env.SMARTSHEET_TOKEN) {
    throw new Error('Access token required');
}

if (!sheetId) {
    throw new Error('Sheet id required');
}

class SmartsheetClient {
    constructor() {
        this.columnMap = {};
    }

    /**
     * Returns filtered list of tasks based on category
     * @param {String} category
     */
    async querySheetByCategory(category) {
        try {
            const sheet = await smartsheet.sheets.getSheet({ id: sheetId });
            this._mapColumnNameToId(sheet.columns);

            return sheet.rows.reduce((tasksArray, row) => {
                const categoryColumn = row.cells[2];
                if (category === categoryColumn.value) {
                    tasksArray.push(row);
                }

                return tasksArray;
            }, []);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Returns a row with given task id
     * @param {Integer} taskId
     */
    async getTaskById(taskId) { // eslint-disable-line class-methods-use-this
        let foundTask;

        try {
            const sheet = await smartsheet.sheets.getSheet({ id: sheetId });

            sheet.rows.forEach((row) => {
                const idColumn = row.cells[4];

                if (taskId === idColumn.value) {
                    foundTask = row;
                }
            });

            return foundTask;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Adds a task
     * @param {Object} task
     */
    async addTask(task) {
        const row = {
            toBottom: true,
            cells: this._buildCellsArrayFromTask(task),
        };

        const options = {
            sheetId,
            body: row,
        };

        try {
            return await smartsheet.sheets.addRows(options);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Updates a task
     * @param {Object} task
     */
    async editTask(task) {
        const updatedCells = this._buildCellsArrayFromTask(task);

        try {
            const rowToUpdate = await this.getTaskById(task.id);

            const options = {
                sheetId,
                body: {
                    id: rowToUpdate.id,
                    cells: updatedCells,
                },
            };

            return await smartsheet.sheets.updateRow(options);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Deletes a task
     * @param {Integer} taskId
     */
    async deleteTask(taskId) {
        try {
            const rowToDelete = await this.getTaskById(taskId);

            const options = {
                sheetId,
                rowId: rowToDelete.id,
            };

            return await smartsheet.sheets.deleteRow(options);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Returns map of column names to their related column ids
     * @param {Array} columns
     */
    _mapColumnNameToId(columns) {
        columns.forEach((column) => {
            if (!this.columnMap[column.title]) {
                this.columnMap[column.title] = column.id;
            }
        });

        return this.columnMap;
    }

    /**
     * Returns an array of cell objects
     * @param {Object} task
     */
    _buildCellsArrayFromTask(task) {
        const taskCopy = Object.assign({}, task);
        delete taskCopy.id;

        const cells = Object.keys(taskCopy).map(taskProp => ({
            columnId: this.columnMap[taskProp],
            value: taskCopy[taskProp],
        }));

        return cells;
    }
}

module.exports = new SmartsheetClient();

// const ss = new SmartsheetClient();

// ss.querySheetByCategory('Heres one with a category').then((sheet) => {
//     console.log(sheet);
// });
