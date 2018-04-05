const smartsheet = require('./rawSmartsheetClient');
const sheetId = require('../../../config.json').SHEET_ID;
const smartsheetHelper = require('../utils/smartsheetHelper');

if (!sheetId) {
  throw new Error('Sheet id required');
}


class SmartsheetClient {
  /**
   * Returns an array of tasks
   */
  async getTasks() {
    const sheet = await smartsheet.sheets.getSheet({ id: sheetId });

    if (sheet.rows.length < 1) {
      return [];
    }

    const columnMap = smartsheetHelper.mapColumnIdToTitle(sheet.columns);

    const tasksArray = sheet.rows.map(row => smartsheetHelper.buildTaskObjectFromCells(row.cells, columnMap));

    return tasksArray;
  }

  /**
   * Returns filtered list of tasks based on category
   * @param {String} category
   */
  async querySheetByCategory(category) {
    if (!category) {
      throw new Error('Missing category');
    }

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
  }

  /**
   * Returns a row with given task id
   * @param {Integer} taskId
   */
  async getRowById(taskId) {
    let foundTask;

    if (!taskId) {
      throw new Error('Missing taskId');
    }

    const sheet = await smartsheet.sheets.getSheet({ id: sheetId });

    sheet.rows.forEach((row) => {
      const idColumn = row.cells[4];

      if (taskId === idColumn.value) {
        foundTask = row;
      }
    });

    return foundTask;
  }

  /**
   * Adds a task
   * @param {Object} task
   */
  async addTask(task) {
    if (!task) {
      throw new Error('Missing task');
    }

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
  }

  /**
   * Updates a task
   * @param {Object} task
   */
  async editTask(task) {
    if (!task) {
      throw new Error('Missing task');
    }

    const sheet = await smartsheet.sheets.getSheet({ id: sheetId });
    const columnMap = smartsheetHelper.mapColumnTitleToId(sheet.columns);
    const updatedCells = smartsheetHelper.buildCellsArrayFromTask(task, columnMap);

    const rowToUpdate = await this.getRowById(task.id);

    const options = {
      sheetId,
      body: {
        id: rowToUpdate.id,
        cells: updatedCells,
      },
    };

    return await smartsheet.sheets.updateRow(options);
  }

  /**
   * Deletes a task
   * @param {Integer} taskId
   */
  async deleteTask(taskId) {
    if (!taskId) {
      throw new Error('Missing taskId');
    }

    const rowToDelete = await this.getRowById(Number(taskId));

    if (!rowToDelete) {
      throw new Error('Task does not exist');
    }

    const options = {
      sheetId,
      rowId: rowToDelete.id,
    };

    return await smartsheet.sheets.deleteRow(options);
  }
}

module.exports = new SmartsheetClient();
