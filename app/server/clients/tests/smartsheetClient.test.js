const sinon = require('sinon');
const should = require('should');
const sheetId = require('../../../../config.json').SHEET_ID;
const smartsheet = require('../rawSmartsheetClient');
const smartsheetHelper = require('../../utils/smartsheetHelper');
const objectUnderTest = require('../smartsheetClient');

describe('Smartsheet client', () => {
  let sandbox;
  let smartsheetMock;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    smartsheetMock = sandbox.mock(smartsheet.sheets);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#querySheetByCategory', () => {
    it('should call smartsheet.getSheet with provided args', async () => {
      /* arrange */
      const dummyCategory = 'dummyCategory';
      const getSheetMock = smartsheetMock.expects('getSheet').withArgs({ id: sheetId }).returns({ columns: [], rows: [] });

      /* act */
      await objectUnderTest.querySheetByCategory(dummyCategory);

      /* assert */
      getSheetMock.verify();
    });
  });

  describe('#getRowById', () => {
    it('should call smartsheet.getSheet with provided args', async () => {
      /* arrange */
      const dummyId = 'dummyId';
      const getSheetMock = smartsheetMock.expects('getSheet').withArgs({ id: sheetId }).returns({ columns: [], rows: [] });

      /* act */
      await objectUnderTest.getRowById(dummyId);

      /* assert */
      getSheetMock.verify();
    });
  });

  describe('#addTask', () => {
    const dummyCells = [
      {
        columnId: 'body',
        value: 'hey this is a body',
      },
      {
        columnId: 'category',
        value: 'hey this is a category',
      },
      {
        columnId: 'status',
        value: 'hey this is a status',
      },
      {
        columnId: 'dueDate',
        value: new Date(),
      },
    ];

    const dummyRow = {
      toBottom: true,
      cells: dummyCells,
    };

    const dummyOptions = {
      sheetId,
      body: dummyRow,
    };

    it('should call smartsheet.addRows with provided args', async () => {
      /* arrange */
      sandbox.stub(smartsheetHelper, 'buildCellsArrayFromTask').returns(dummyCells);
      const addRowsMock = smartsheetMock.expects('addRows').withArgs(dummyOptions);

      /* act */
      await objectUnderTest.addTask(dummyOptions);

      /* assert */
      addRowsMock.verify();
    });
  });

  describe('#editTask', () => {
    const dummyCells = [
      {
        columnId: 'body',
        value: 'hey this is a body',
      },
      {
        columnId: 'category',
        value: 'hey this is a category',
      },
      {
        columnId: 'status',
        value: 'hey this is a status',
      },
      {
        columnId: 'dueDate',
        value: new Date(),
      },
    ];

    const dummyRow = {
      id: 'dummyId',
      cells: dummyCells,
    };

    const dummyOptions = {
      sheetId,
      body: dummyRow,
    };

    it('should call smartsheet.updateRow with provided args', async () => {
      /* arrange */
      sandbox.stub(smartsheetHelper, 'buildCellsArrayFromTask').returns(dummyCells);
      sandbox.stub(objectUnderTest, 'getRowById').returns(dummyRow);
      const updateRowMock = smartsheetMock.expects('updateRow').withArgs(dummyOptions);

      /* act */
      await objectUnderTest.editTask({});

      /* assert */
      updateRowMock.verify();
    });
  });

  describe('#deleteTask', () => {
    const dummyCells = [
      {
        columnId: 'body',
        value: 'hey this is a body',
      },
      {
        columnId: 'category',
        value: 'hey this is a category',
      },
      {
        columnId: 'status',
        value: 'hey this is a status',
      },
      {
        columnId: 'dueDate',
        value: new Date(),
      },
    ];

    const dummyRow = {
      id: 'dummyId',
      cells: dummyCells,
    };

    const dummyOptions = {
      sheetId,
      rowId: 'dummyId',
    };

    it('should call smartsheet.deleteRow with provided args', async () => {
      /* arrange */
      sandbox.stub(objectUnderTest, 'getRowById').returns(dummyRow);
      const deleteRowMock = smartsheetMock.expects('deleteRow').withArgs(dummyOptions);

      /* act */
      await objectUnderTest.deleteTask('dummyId');

      /* assert */
      deleteRowMock.verify();
    });
  });
});
