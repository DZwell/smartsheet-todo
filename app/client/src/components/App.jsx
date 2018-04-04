import React, { Component } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import taskClient from '../clients/task';
import '../styles/index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      taskToEdit: {},
    }
    this.loadTaskToEdit = this.loadTaskToEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  async componentWillMount() {
    const results = await taskClient.getTasks();
    this.setState({ tasks: results.tasks });
  }

  loadTaskToEdit(task) {
    this.setState({ taskToEdit: task });
  }

  async handleSubmit(task, isEditing = false) {
    if (isEditing) {
      await taskClient.editTask(task);
      const results = await taskClient.getTasks();
      this.setState({ tasks: results.tasks });
    } else {
      await taskClient.addTask(task);
      const results = await taskClient.getTasks();
      this.setState({ tasks: results.tasks });
    }
  }

  async handleDelete(id) {
    await taskClient.deleteTask(id);
    const results = await taskClient.getTasks();
    this.setState({ tasks: results.tasks });
  }

  async handleStatusChange(task) {
    await taskClient.changeStatus(task);
    const results = await taskClient.getTasks();
    this.setState({ tasks: results.tasks });
  }

  render() {
    return (
      <div className="app-container">
        <h1>Smartsheet To do</h1>
        <AddTask
          edit={this.state.taskToEdit}
          onSubmit={this.handleSubmit}
        />
        <TaskList
          tasks={this.state.tasks}
          edit={this.loadTaskToEdit}
          delete={this.handleDelete}
          changeStatus={this.handleStatusChange}
        />
      </div>
    );
  }
}

export default App;
