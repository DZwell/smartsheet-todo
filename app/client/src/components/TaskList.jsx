import React, { Component } from 'react';
import Task from './Task';
import taskController from '../controllers/task';
import '../static/index.css';

class TaskList extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    taskController.getTasks()
      .then(res => this.setState({ tasks: res.tasks }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="task-list-container">
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
