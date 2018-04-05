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
      <div className="task-list-container">
        {this.props.tasks.map(task =>
          <ul key={task.id}>
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
          </ul>
        )}
      </div>
    );
  }
}

export default TaskList;
