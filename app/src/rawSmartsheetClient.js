const smartsheet = require('smartsheet');

const smartsheetClient = smartsheet.createClient({ accessToken: process.env.SMARTSHEET_TOKEN });

module.exports = smartsheetClient;
