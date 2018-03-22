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
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Updates a task
 * @param {Object} task
 */
async function editTask(task) {
    let updatedRow;
    const updatedCells = buildCellsArrayFromTask(task);

    sheet.rows.forEach((row) => {
        const idColumn = row.cells[4];
        if (task.id === idColumn.value) {
            updatedRow = {
                id: row.id,
                cells: updatedCells,
            };
        }
    });

    if (!updatedRow) {
        throw new Error('404, Task not found');
    }

    const options = {
        sheetId,
        body: updatedRow,
    };

    try {
        const result = await smartsheet.sheets.updateRow(options);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Deletes a task
 * @param {Integer} taskId
 */
async function deleteTask(taskId) {
    let rowToDelete;

    sheet.rows.forEach((row) => {
        const idColumn = row.cells[4];
        if (taskId === idColumn.value) {
            rowToDelete = row;
        }
    });

    if (!rowToDelete) {
        throw new Error('404, Task not found');
    }

    const options = {
        sheetId,
        rowId: rowToDelete.id,
    };

    console.log(rowToDelete);

    try {
        const result = await smartsheet.sheets.deleteRow(options);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

const hey = {
    body: 'Moose, clean fadfadfsadfor PEsach',
    status: 'definitely notadfadf done',
    category: 'THIS SHOULD BE MORE DIFFERENT',
    dueDate: new Date(),
    id: 3,
};

getSheet().then(() => {
    deleteTask(1);
});

// smartsheet.sheets.getSheet({ id: sheetId }).then((something) => {
//     console.log(something.rows[1]);
// }).catch((err) => {
//     console.log(err);
// });
