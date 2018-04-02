import React, { Component } from 'react';
import taskController from '../controllers/task';
import '../static/index.css';

class Task extends Component {
  constructor(props) {
    super();
    this.state = {
      tasks: [],
      done: false,
    }
  }

  handleDelete(id) {
    taskController.deleteTask(id).catch((err) => {
      console.log(err);
    });
  }

  componentDidUpdate() {
    taskController.changeStatus(this.props).catch((err) => {
      console.log(err);
    });
  }

  changeComplete = () => {
    this.setState({ done: !this.state.done });
  }

  render() {

    const status = this.props.completed ? 'Done' : 'Not done';

    return (
      <div>
        <input type="checkbox" onChange={this.changeComplete} defaultChecked={this.props.completed}></input>
        <li className="task-item" key={this.props.id}>{this.props.body} ----- {status}</li>
        <button type="submit" onClick={() => this.handleDelete(this.props.id)}>Delete</button>
      </div>
    );
  }
}

export default Task;