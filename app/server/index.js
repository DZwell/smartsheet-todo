const smartsheetClient = require('./clients/smartsheetClient');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await smartsheetClient.getTasks();
  } catch (err) {
    console.log(err);
  }
  res.send({ tasks });
});

app.get('/api/tasks/:category', async (req, res) => {
  try {
    const tasks = await smartsheetClient.querySheetByCategory(req.params.category);
  } catch (err) {
    console.log(err);
  }
  res.send({ tasks });
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const result = await smartsheetClient.deleteTask(req.params.id);
  } catch (err) {
    console.log(err);
  }
  res.send({ result });
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const result = await smartsheetClient.editTask(req.body);
  } catch (err) {
    console.log(err);
  }
  res.send({ result });
});

app.post('/api/tasks', async (req, res) => {
  try {
    const result = await smartsheetClient.addTask(req.body);
  } catch (err) {
    console.log(err);
  }
  res.send({ result });
});

app.listen(3000, () => console.log('Listening on port 3000!'));
