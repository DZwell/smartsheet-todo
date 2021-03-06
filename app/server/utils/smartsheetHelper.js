
class SmartsheetHelper {
  /**
   * Returns map of column titles to their related column ids
   * @param {Array} columns
   */
  mapColumnTitleToId(columns) {
    const columnMap = {};

    columns.forEach((column) => {
      if (!columnMap[column.title]) {
        columnMap[column.title] = column.id;
      }
    });

    return columnMap;
  }

  /**
   * Returns map of column ids to their related column titles
   * @param {Array} columns
   */
  mapColumnIdToTitle(columns) {
    const columnMap = {};

    columns.forEach((column) => {
      if (!columnMap[column.id]) {
        columnMap[column.id] = column.title;
      }
    });

    return columnMap;
  }

  /**
   * Returns an array of cell objects
   * @param {Object} task
   */
  buildCellsArrayFromTask(task, columnMap) {
    const taskCopy = Object.assign({}, task);
    delete taskCopy.id;

    const cells = Object.keys(taskCopy).map(taskProp => ({
      columnId: columnMap[taskProp],
      value: taskCopy[taskProp],
    }));

    return cells;
  }

  /**
   * Returns a task object
   * @param {Array} cellsArray
   */
  buildTaskObjectFromCells(cellsArray, columnMap) {
    const taskObject = {};

    cellsArray.forEach((cell) => {
      const taskProperty = columnMap[cell.columnId];
      taskObject[taskProperty] = cell.value;
    });

    return taskObject;
  }
}

module.exports = new SmartsheetHelper();
