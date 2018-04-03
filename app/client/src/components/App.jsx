import React, { Component } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import taskController from '../controllers/task';
import '../styles/index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      taskToEdit: {},
    }
    this.editTask = this.editTask.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    const results = await taskController.getTasks();
    this.setState({ tasks: results.tasks });
  }

  // HandleLoadEditTask or something like that
  editTask(task) {
    this.setState({ taskToEdit: task });
  }

  // Break out into handleEdit and handleAdd maybe
  async handleSubmit(task, isEditing = false) {
    if (isEditing) {
      await taskController.editTask(task);
    } else {
      await taskController.addTask(task);
    }
    const results = await taskController.getTasks();
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
          edit={this.editTask}

        />
      </div>
    );
  }
}

export default App;
