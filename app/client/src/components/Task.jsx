import React, { Component } from 'react';
import taskController from '../controllers/task';
import '../styles/index.css';

class Task extends Component {
  constructor(props) {
    super();

    this.changeStatus = this.changeStatus.bind(this);
  }

  handleDelete(id) {
    taskController.deleteTask(id).catch((err) => {
      console.log(err);
    });
  }


  changeStatus() {
    this.setState({ sup: this.props });
    taskController.changeStatus(this.props).catch((err) => {
      console.log(err);
    });
  }

  handleEdit(taskToEdit) {
    this.props.edit(taskToEdit);
  }

  render() {

    const status = this.props.completed ? 'Done' : 'Not done';

    return (
      <li className="task-item">
        <input type="checkbox" onChange={this.changeStatus} defaultChecked={this.props.completed}></input>
        <span onClick={this.editTask} key={this.props.id}>{this.props.body} ----- {status} --- Due on: {this.props.dueDate}</span>
        <button type="submit" onClick={() => this.handleDelete(this.props.id)}>Delete</button>
        <button type="button" onClick={() => this.handleEdit(this.props)}>Edit</button>
      </li>
    );
  }
}

export default Task;