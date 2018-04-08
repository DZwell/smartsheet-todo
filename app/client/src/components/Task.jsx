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
    let monthFirstDateString;
    const status = this.props.completed ? 'Done' : 'Not done';

    if (this.props.dueDate) {
      // Change date format so month comes first e.g 04/013/2001
      const dateArray = this.props.dueDate.split('-');
      monthFirstDateString = `${dateArray[1]}-${dateArray[2]}-${dateArray[0]}`;
    }

    return (
      <tr>
        <td>
          <input disabled={this.props.loading} type="checkbox" onChange={() => this.handleStatusChange(this.props)} defaultChecked={this.props.completed}></input>
        </td>
        <td>
          {this.props.body}
        </td>
        <td>
          {status}
        </td>
        <td>
          {!monthFirstDateString ? this.props.dueDate : monthFirstDateString}
        </td>
        <td>
          {this.props.category}
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