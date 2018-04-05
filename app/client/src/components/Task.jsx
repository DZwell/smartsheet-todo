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
    delete statusChangedTask.loading;
    this.props.changeStatus(statusChangedTask);
  }

  render() {

    const status = this.props.completed ? 'Done' : 'Not done';

    return (
      <tr>
        <td>
          <input type="checkbox" onChange={() => this.handleStatusChange(this.props)} defaultChecked={this.props.completed}></input>
        </td>
        <td>
          {this.props.body}
        </td>
        <td>
          {status}
        </td>
        <td>
          {this.props.dueDate}
        </td>
        <td>
          <button className="delete" disabled={this.props.loading} onClick={() => this.handleDelete(this.props.id)}>Delete</button>
          <button disabled={this.props.loading} onClick={() => this.handleEdit(this.props)}>Edit</button>
        </td>
      </tr>
    );
  }
}

export default Task;