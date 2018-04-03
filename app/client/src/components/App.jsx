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
  }

  componentDidMount() {
    taskController.getTasks()
      .then(res => this.setState({ tasks: res.tasks }))
      .catch(err => console.log(err));
  }

  editTask(task) {
    this.setState({ taskToEdit: task });
  }

  render() {
    return (
      <div className="app-container">
        <h1>Smartsheet To do</h1>
        <AddTask 
          edit={this.state.taskToEdit}
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
