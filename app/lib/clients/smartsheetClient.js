const smartsheet = require('./rawSmartsheetClient');
const sheetId = require('../../../config.json').SHEET_ID;
const smartsheetHelper = require('../utils/smartsheetHelper');

if (!sheetId) {
    throw new Error('Sheet id required');
}

/**
 * Returns an array of tasks
 */
async function getTasks() {
    try {
        const sheet = await smartsheet.sheets.getSheet({ id: sheetId });

        if (sheet.rows.length < 1) {
            return [];
        }

        const columnMap = smartsheetHelper.mapColumnIdToTitle(sheet.columns);

        return sheet.rows.map(row => smartsheetHelper.buildTaskObjectFromCells(row.cells, columnMap));
    } catch (err) {
        throw err;
    }
}

/**
 * Returns filtered list of tasks based on category
 * @param {String} category
 */
async function querySheetByCategory(category) {

    if (!category) {
        throw new Error('Missing category');
    }

    try {
        const sheet = await smartsheet.sheets.getSheet({ id: sheetId });
        const columnMap = smartsheetHelper.mapColumnIdToTitle(sheet.columns);

        const filteredRows = sheet.rows.reduce((tasksArray, row) => {
            const categoryColumn = row.cells[2];
            if (category === categoryColumn.value) {
                tasksArray.push(row);
            }

            return tasksArray;
        }, []);

        const filteredTasks = filteredRows.map(row => smartsheetHelper.buildTaskObjectFromCells(row.cells, columnMap));

        return filteredTasks;
    } catch (err) {
        throw err;
    }
}

/**
 * Returns a row with given task id
 * @param {Integer} taskId
 */
async function getRowById(taskId) {
    let foundTask;

    
    if (!taskId) {
        throw new Error('Missing taskId');
    }
    
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
async function addTask(task) {

    if (!task) {
        throw new Error('Missing task');
    }

    try {
        const sheet = await smartsheet.sheets.getSheet({ id: sheetId });
        const columnMap = smartsheetHelper.mapColumnTitleToId(sheet.columns);
        const cellsArray = smartsheetHelper.buildCellsArrayFromTask(task, columnMap);

        const row = {
            toBottom: true,
            cells: cellsArray,
        };

        const options = {
            sheetId,
            body: row,
        };

        return await smartsheet.sheets.addRows(options);
    } catch (err) {
        throw err;
    }
}

/**
 * Updates a task
 * @param {Object} task
 */
async function editTask(task) {

    if (!task) {
        throw new Error('Missing task');
    }

    try {
        const sheet = await smartsheet.sheets.getSheet({ id: sheetId });
        const columnMap = smartsheetHelper.mapColumnTitleToId(sheet.columns);
        const updatedCells = smartsheetHelper.buildCellsArrayFromTask(task, columnMap);

        const rowToUpdate = await getRowById(task.id);

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
async function deleteTask(taskId) {

    if (!taskId) {
        throw new Error('Missing taskId');
    }

    try {
        const rowToDelete = await getRowById(Number(taskId));

        if (!rowToDelete) {
            throw new Error('Task does not exist');
        }

        const options = {
            sheetId,
            rowId: rowToDelete.id,
        };

        return await smartsheet.sheets.deleteRow(options);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getTasks,
    getRowById,
    querySheetByCategory,
    addTask,
    editTask,
    deleteTask
}