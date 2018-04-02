import React, { Component } from 'react';
import taskController from '../controllers/task';
import '../static/index.css';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      dueDate: '',
      completed: false,
      category: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    taskController.addTask(this.state);
    console.log(this.state.value);
    window.location.reload();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Add a task here:
          <input placeholder="Task body"  name="body" type="text" value={this.state.body} onChange={this.handleChange} />
        </label>
        <label>
          Category:
          <input placeholder="*optional" name="category" type="text" value={this.state.category} onChange={this.handleChange} />
        </label>
        <label>
          Due date:
          <input type="date" name="dueDate" value={this.state.dueDate} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" onClick={this.handleSubmit}/>
      </form>
    );
  }
}

export default AddTask;
