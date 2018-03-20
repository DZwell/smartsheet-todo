const smartsheet = require('smartsheet');
const sinon = require('sinon');

const objectUnderTest = require('../smartsheetClient');


describe('Smartsheet client', () => {
    const dummySheetId = 'dummyId';

    describe('#getSheet', async () => {
        it('should call smartsheet.getSheet with provided args', () => {
            /* arrange */
            const getSheetMock = sinon.mock(smartsheet, 'getSheet').expects({ id: dummySheetId });

            /* act */
            objectUnderTest.getSheet();

            /* assert */
            getSheetMock.verify();
        });
    });
});
