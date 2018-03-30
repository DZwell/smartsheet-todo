import React, { Component } from 'react';
import Task from './Task';
import '../static/index.css';

class TaskList extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    this.getTasks()
      .then(res => this.setState({ tasks: res.tasks }))
      .catch(err => console.log(err));
  }

  async getTasks() {
    const response = await fetch('/api/tasks');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  render() {
    return (
      <div className="task-list-container">
        <h1>Smartsheet To do</h1>
        {this.state.tasks.map(task =>
        <ul key={task.id}>
          <Task 
          key={task.id}
          body={task.body}
          id={task.id}
          completed={task.completed}
          category={task.category}
          dueDate={task.dueDate}
          />
        </ul>
        )}
      </div>
    );
  }
}

export default TaskList;
