import React, { Component } from 'react';
import '../static/App.css';

class Task extends Component {
  constructor(props) {
    super();
    this.state = {
      tasks: [],
      done: false,
    }

    this.deleteTask = this.deleteTask.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  componentDidUpdate() {
    this.changeStatus().then((result) => {
      console.log('yooo');
    });
  }

  async deleteTask() {
    const response = await fetch(`/api/tasks/${this.props.id}`, { method: 'DELETE' });
    const body = await response.json();
    console.log(body);
    
    if (response.status !== 200) {
      throw Error(body.message);
    }
    // TODO: Rerender or forceUpdate or something instead of this
    window.location.reload();
    return body;
  }

  async changeStatus() {
    const taskObject = Object.assign({}, this.props, { completed: !this.props.completed });
    const response = await fetch(`/api/tasks/${this.props.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(taskObject),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    });
    const body = await response.json();
    console.log(body);
    
    if (response.status !== 200) {
      throw Error(body.message);
    }
    
    return body;
  }

  changeComplete = () => {
    this.setState({ done: !this.state.done });
  }

  render() {

    return (
      <div>
        <input type="checkbox" onChange={this.changeComplete} defaultChecked={this.props.completed}></input>
        <li key={this.props.id}>{this.props.body} -- {this.state.done}</li>
        <button type="submit" onClick={this.deleteTask}>Delete</button>
      </div>
    );
  }
}

export default Task;