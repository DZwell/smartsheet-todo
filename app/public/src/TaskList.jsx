import React, { Component } from 'react';
import Task from './Task';
import './App.css';

class TaskList extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ tasks: res.tasks }))
      .catch(err => console.log(err));
  }

  async callApi() {
    const response = await fetch('/api/tasks');
    const body = await response.json();
    console.log(body);

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <h1>Smartsheet Todo</h1>
        {this.state.tasks.map(task =>
          <Task 
          key={task.id}
          body={task.body}
          id={task.id}
          />
        )}
      </div>
    );
  }
}

export default TaskList;
