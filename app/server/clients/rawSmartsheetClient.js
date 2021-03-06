const smartsheet = require('smartsheet');

if (!process.env.SMARTSHEET_TOKEN) {
    throw new Error('Smartsheet API token required');
}

const smartsheetClient = smartsheet.createClient({ accessToken: process.env.SMARTSHEET_TOKEN });

module.exports = smartsheetClient;