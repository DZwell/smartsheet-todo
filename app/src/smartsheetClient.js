const client = require('smartsheet');
const sheetId = require('../../config.json').SHEET_ID;

if (!process.env.SMARTSHEET_TOKEN) {
    throw new Error('Access token required');
}

if (!sheetId) {
    throw new Error('Sheet id required');
}

let sheet;
const columnMap = {};
const smartsheet = client.createClient({ accessToken: process.env.SMARTSHEET_TOKEN });

/**
 * Returns map of column names to their related column ids
 * @param {Array} columns
 */
function mapColumnNameToId(columns) {
    columns.forEach((column) => {
        if (!columnMap[column.title]) {
            columnMap[column.title] = column.id;
        }
    });

    return columnMap;
}

/**
 * Returns an array of cell objects
 * @param {Object} task
 */
function buildCellsArrayFromTask(task) {
    const taskCopy = Object.assign({}, task);
    delete taskCopy.id;

    const cells = Object.keys(taskCopy).map(taskProp => ({
        columnId: columnMap[taskProp],
        value: taskCopy[taskProp],
    }));

    return cells;
}

/**
 * Returns a row with given task id
 * @param {Integer} taskId
 */
function getTaskById(taskId) {
    let foundTask;
    sheet.rows.forEach((row) => {
        const idColumn = row.cells[4];

        if (taskId === idColumn.value) {
            foundTask = row;
        }
    });

    return foundTask;
}

/**
 * Returns filtered list of tasks based on category
 * @param {String} category
 */
function queryTasksByCategory(category) {
    const filteredTasks = sheet.rows.reduce((tasksArray, row) => {
        const categoryColumn = row.cells[2];
        
        if (category === categoryColumn.value) {
            tasksArray.push(row);
        }

        return tasksArray;
    }, []);

    return filteredTasks;
}

/**
 * Returns entire sheet object
 */
async function getSheet() {
    try {
        sheet = await smartsheet.sheets.getSheet({ id: sheetId });
        mapColumnNameToId(sheet.columns);

        return sheet;
    } catch (err) {
        throw new Error(err.message);
    }
}

/**
 * Adds a task
 * @param {Object} task
 */
async function addTask(task) {
    const row = {
        toBottom: true,
        cells: buildCellsArrayFromTask(task),
    };

    const options = {
        sheetId,
        body: row,
    };

    try {
        const result = await smartsheet.sheets.addRows(options);
        return result;
    } catch (err) {
        console.log(err);
    }
}

/**
 * Updates a task
 * @param {Object} task
 */
async function editTask(task) {
    const updatedCells = buildCellsArrayFromTask(task);
    const rowToUpdate = getTaskById(task.id);

    if (!rowToUpdate) {
        throw new Error('404, Task not found');
    }

    const options = {
        sheetId,
        body: {
            id: rowToUpdate.id,
            cells: updatedCells,
        },
    };

    try {
        const result = await smartsheet.sheets.updateRow(options);
        return result;
    } catch (err) {
        throw err;
    }
}

/**
 * Deletes a task
 * @param {Integer} taskId
 */
async function deleteTask(taskId) {
    const rowToDelete = getTaskById(taskId);

    if (!rowToDelete) {
        throw new Error('404, Task not found');
    }

    const options = {
        sheetId,
        rowId: rowToDelete.id,
    };

    try {
        const result = await smartsheet.sheets.deleteRow(options);
        return result;
    } catch (err) {
        throw err;
    }
}

const hey = {
    body: 'Diff body',
    status: 'definitely notadfadf done',
    category: 'Heres one with another category',
    dueDate: new Date(),
};

getSheet().then(() => {
    console.log(queryTasksByCategory(hey.category));
});

// smartsheet.sheets.getSheet({ id: sheetId }).then((something) => {
//     console.log(something.rows[1]);
// }).catch((err) => {
//     console.log(err);
// });
