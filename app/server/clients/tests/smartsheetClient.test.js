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

        it('should catch error', async () => {
            /* arrange */
            let actual;
            const expected = new Error('Error');
            const dummyCategory = 'dummyCategory';
            sandbox.stub(smartsheet.sheets, 'getSheet').throws();

            /* act */
            try {
                await objectUnderTest.querySheetByCategory(dummyCategory);
            } catch (err) {
                actual = err;
            }

            /* assert */
            should.deepEqual(actual, expected);
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

        it('should catch error', async () => {
            /* arrange */
            let actual;
            const expected = new Error('Error');
            const dummyId = 'dummyId';
            sandbox.stub(smartsheet.sheets, 'getSheet').throws();

            /* act */
            try {
                await objectUnderTest.getRowById(dummyId);
            } catch (err) {
                actual = err;
            }

            /* assert */
            should.deepEqual(actual, expected);
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

        it('should catch error', async () => {
            /* arrange */
            let actual;
            const expected = new Error('Error');
            sandbox.stub(smartsheet.sheets, 'addRows').throws();

            /* act */
            try {
                await objectUnderTest.addTask({});
            } catch (err) {
                actual = err;
            }

            /* assert */
            should.deepEqual(actual, expected);
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

        it('should catch error', async () => {
            /* arrange */
            let actual;
            const expected = new Error('Error');
            sandbox.stub(smartsheetHelper, 'buildCellsArrayFromTask').returns(dummyCells);
            sandbox.stub(objectUnderTest, 'getRowById').returns(dummyRow);
            sandbox.stub(smartsheet.sheets, 'updateRow').throws();

            /* act */
            try {
                await objectUnderTest.editTask({});
            } catch (err) {
                actual = err;
            }

            /* assert */
            should.deepEqual(actual, expected);
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

        it('should catch error', async () => {
            /* arrange */
            let actual;
            const expected = new Error('Error');
            sandbox.stub(objectUnderTest, 'getRowById').returns(dummyRow);
            sandbox.stub(smartsheet.sheets, 'deleteRow').throws();

            /* act */
            try {
                await objectUnderTest.deleteTask('dummyId');
            } catch (err) {
                actual = err;
            }

            /* assert */
            should.deepEqual(actual, expected);
        });
    });
});
