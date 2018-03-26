const smartsheetClient = require('./smartsheetClient');

const express = require('express');

const app = express();

app.get('/', (req, res) => res.send(smartsheetClient.getSheet().then((sheet) => {
    console.log(sheet);
})));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
