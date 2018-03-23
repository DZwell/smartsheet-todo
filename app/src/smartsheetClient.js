const client = require('smartsheet');
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
        this.smartsheet = client.createClient({ accessToken: process.env.SMARTSHEET_TOKEN });
    }

    /**
     * Returns entire sheet object
     */
    async getSheet() {
        try {
            const sheet = await this.smartsheet.sheets.getSheet({ id: sheetId });
            this.columnMap = this._mapColumnNameToId(sheet.columns);

            return sheet;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    /**
     * Returns filtered list of tasks based on category
     * @param {String} category
     */
    async querySheetByCategory(category) {
        try {
            const sheet = await this.smartsheet.sheets.getSheet({ id: sheetId });
            this._mapColumnNameToId(sheet.columns);

            return sheet.rows.reduce((tasksArray, row) => {
                const categoryColumn = row.cells[2];
                if (category === categoryColumn.value) {
                    tasksArray.push(row);
                }

                return tasksArray;
            }, []);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    /**
     * Returns a row with given task id
     * @param {Integer} taskId
     */
    async getTaskById(taskId) {
        let foundTask;

        try {
            const sheet = await this.smartsheet.sheets.getSheet({ id: sheetId });

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
            return await this.smartsheet.sheets.addRows(options);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Updates a task
     * @param {Object} task
     */
    async editTask(task) {
        let rowToUpdate;
        const updatedCells = this._buildCellsArrayFromTask(task);

        try {
            rowToUpdate = await this.getTaskById(task.id);
        } catch (err) {
            throw err;
        }

        const options = {
            sheetId,
            body: {
                id: rowToUpdate.id,
                cells: updatedCells,
            },
        };

        try {
            return await this.smartsheet.sheets.updateRow(options);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Deletes a task
     * @param {Integer} taskId
     */
    async deleteTask(taskId) {
        let rowToDelete;

        try {
            rowToDelete = await this.getTaskById(taskId);
        } catch (err) {
            throw err;
        }

        const options = {
            sheetId,
            rowId: rowToDelete.id,
        };

        try {
            return await this.smartsheet.sheets.deleteRow(options);
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

// export default new SmartsheetClient();

const ss = new SmartsheetClient();

ss.getSheet().then((sheet) => {
    console.log(sheet);
});
