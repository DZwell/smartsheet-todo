const smartsheetClient = require('./clients/smartsheetClient');
const express = require('express');

const app = express();

app.get('/api/tasks', (req, res) => {
    smartsheetClient.getTasks().then((tasks) => {


        res.send({ tasks });
    }).catch((error) => {
        throw error;
    });
});

app.delete('/api/tasks/:id', (req, res) => {
    smartsheetClient.deleteTask(req.params).then((result) => {

        res.send({ result });
        console.log(result);
    }).catch((error) => {
        throw error;
    });
});


app.use('/*', express.static(`${__dirname}/lib/`));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
