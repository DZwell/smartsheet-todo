import React, { Component } from 'react';
import Task from './Task';
import '../styles/index.css';

class TaskList extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleEdit(taskToEdit) {
    this.props.edit(taskToEdit);
  }

  handleDelete(id) {
    this.props.delete(id);
  }

  handleStatusChange(task) {
    this.props.changeStatus(task);
  }

  render() {
    return (
      <table className="task-list-container">
        <thead>
          <tr>
            <th>*</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>**</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tasks.map(task =>
            <Task
              key={task.id}
              body={task.body}
              id={task.id}
              completed={task.completed}
              category={task.category}
              dueDate={task.dueDate}
              edit={this.handleEdit}
              delete={this.handleDelete}
              changeStatus={this.handleStatusChange}
              loading={this.props.loading}
            />
          )}
        </tbody>
      </table>
    );
  }
}

export default TaskList;
