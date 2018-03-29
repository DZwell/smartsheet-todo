const rawSmartsheetClient = require('../clients/rawSmartsheetClient');
const smartsheetClient = require('../clients/smartsheetClient');

class SmartsheetController {
    async getTasks() {
        const sheet = await rawSmartsheetClient.sheet.getSheet()
    }
}

module.exports = new SmartsheetController();
