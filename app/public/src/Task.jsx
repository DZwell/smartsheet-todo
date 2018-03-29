import React, { Component } from 'react';
import './App.css';

class Task extends Component {
  constructor(props) {
    super();
    this.state = {
      tasks: []
    }

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask() {
    fetch(`/api/tasks/${this.props.id}`, { method: 'DELETE', body: this.props.id }).then(() => {
      window.location.reload();
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <p onClick={this.deleteTask} key={this.props.id}>{this.props.body}</p>
      </div>
    );
  }
}

export default Task;