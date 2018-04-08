const smartsheetClient = require('./clients/smartsheetClient');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await smartsheetClient.getTasks();
    res.send({ tasks });
  } catch (err) {
    console.log(err);
  }
});

app.get('/api/tasks/:category', async (req, res) => {
  try {
    const tasks = await smartsheetClient.querySheetByCategory(req.params.category);
    res.send({ tasks });
  } catch (err) {
    console.log(err);
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const result = await smartsheetClient.deleteTask(req.params.id);
    res.send({ result });
  } catch (err) {
    console.log(err);
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const result = await smartsheetClient.editTask(req.body);
    res.send({ result });
  } catch (err) {
    console.log(err);
  }
 });

app.post('/api/tasks', async (req, res) => {
  try {
    const result = await smartsheetClient.addTask(req.body);
    res.send({ result });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => console.log('Listening on port 3000!'));
