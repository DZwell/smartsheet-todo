const smartsheetClient = require('./clients/smartsheetClient');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


app.get('/api/tasks', async (req, res) => {
  const tasks = await smartsheetClient.getTasks();
  res.send({ tasks });
});

app.get('/api/tasks/:category', async (req, res) => {
  const tasks = await smartsheetClient.querySheetByCategory(req.params.category);
  res.send({ tasks });
});

app.delete('/api/tasks/:id', async (req, res) => {
  const result = await smartsheetClient.deleteTask(req.params.id);
  res.send({ result });
});

app.put('/api/tasks/:id', async (req, res) => {
  const result = await smartsheetClient.editTask(req.body);
  res.send({ result });
});

app.post('/api/tasks', async (req, res) => {
  const result = await smartsheetClient.addTask(req.body);
  res.send({ result });
});

app.use('/*', express.static(`${__dirname}/lib/`));

app.listen(3000, () => console.log('Listening on port 3000!'));
