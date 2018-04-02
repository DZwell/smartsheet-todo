const smartsheetClient = require('./clients/smartsheetClient');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


app.get('/api/tasks', (req, res) => {
    smartsheetClient.getTasks().then((tasks) => {


        res.send({ tasks });
    }).catch((error) => {
        throw error;
    });
});

app.delete('/api/tasks/:id', (req, res) => {
    smartsheetClient.deleteTask(req.params.id).then((result) => {

        res.send({ result });
    }).catch((error) => {
        console.log(error);
    });
});

app.put('/api/tasks/:id', (req, res) => {
    smartsheetClient.editTask(req.body).then((result) => {

        res.send({ result });
    }).catch((error) => {
        console.log(error);
    });
});

app.post('/api/tasks', (req, res) => {
    smartsheetClient.addTask(req.body).then((result) => {

        res.send({ result });
    }).catch((error) => {
        console.log(error);
    });
});


app.use('/*', express.static(`${__dirname}/lib/`));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
