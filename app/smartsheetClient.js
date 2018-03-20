const client = require('smartsheet');
const sheetId = require('../config.json').SHEET_ID;

if (!process.env.SMARTSHEET_TOKEN) {
    throw new Error('Access token required');
}

if (!sheetId) {
    throw new Error('Sheet id required');
}

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
 * Returns row object with populated cells
 * @param {Object} task
 */
function buildRowObjectFromTask(task) {
    const row = { toTop: true };

    const cells = Object.keys(task).map(taskProp => ({
        columnId: columnMap[taskProp],
        value: task[taskProp],
    }));

    row.cells = cells;

    return row;
}

async function getSheet() {
    try {
        const sheet = await smartsheet.sheets.getSheet({ id: sheetId });
        mapColumnNameToId(sheet.columns);
        return sheet;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function addTask(task) {
    try {
        await getSheet();
        const row = buildRowObjectFromTask(task);

        const options = {
            sheetId,
            body: row,
        };

        await smartsheet.sheets.addRows(options);
    } catch (err) {
        console.log(err);
    }
}

const hey = {
    body: 'some modfdre text',
    status: 'not df',
    category: 'dfdf list',
    dueDate: 'adf',
};

addTask(hey);

