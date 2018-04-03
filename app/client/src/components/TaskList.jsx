import React, { Component } from 'react';
import Task from './Task';
import '../styles/index.css';

class TaskList extends Component {
  getTaskToEdit = (taskToEdit) => {
    this.props.edit(taskToEdit);
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
              edit={this.getTaskToEdit}
            />
          </ul>
        )}
      </div>
    );
  }
}

export default TaskList;
