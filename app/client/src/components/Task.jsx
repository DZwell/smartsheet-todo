import React, { Component } from 'react';
import '../styles/index.css';

class Task extends Component {

  handleEdit(taskToEdit) {
    this.props.edit(taskToEdit);
  }

  handleDelete(id) {
    this.props.delete(id);
  }

  handleStatusChange(task) {
    const statusChangedTask = Object.assign({}, task, { completed: !task.completed });
    this.props.changeStatus(statusChangedTask);
  }

  render() {

    const status = this.props.completed ? 'Done' : 'Not done';

    return (
      <li className="task-item">
        <input type="checkbox" onChange={() => this.handleStatusChange(this.props)} defaultChecked={this.props.completed}></input>
        <span onClick={this.editTask} key={this.props.id}>{this.props.body} ----- {status} --- Due on: {this.props.dueDate}</span>
        <button onClick={() => this.handleDelete(this.props.id)}>Delete</button>
        <button onClick={() => this.handleEdit(this.props)}>Edit</button>
      </li>
    );
  }
}

export default Task;