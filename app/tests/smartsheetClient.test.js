const smartsheet = require('smartsheet');
const sinon = require('sinon');

const objectUnderTest = require('../smartsheetClient');


describe('Smartsheet client', () => {
    const dummySheetId = 'dummyId';

    describe('#getSheet', () => {
        it('should call smartsheet.getSheet with provided args', async () => {
            /* arrange */
            const getSheetMock = sinon.mock(smartsheet, 'getSheet').expects({ id: dummySheetId });

            /* act */
            await objectUnderTest.getSheet();

            /* assert */
            getSheetMock.verify();
        });
    });
});
