import React, { Component } from 'react';
import taskController from '../controllers/task';
import '../styles/index.css';

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


  componentWillReceiveProps() {
    if (Object.keys(this.props.edit).length > 0) {
      Object.keys(this.props.edit).forEach((key) => {
        this.setState({
          [key]: this.props.edit[key]
        });
      });
    }
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    if (Object.keys(this.props.edit).length > 0) {
      const taskWithId = Object.assign({}, this.state, { id: this.props.edit.id });
      taskController.editTask(taskWithId);
      window.location.reload();
    } else {
      taskController.addTask(this.state);
      window.location.reload();
    }
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
          <input placeholder="*optional" name="category" type="text"value={this.state.category}  onChange={this.handleChange} />
        </label>
        <label>
          Due date:
          <input type="date" name="dueDate" value={this.state.dueDate}  onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" onClick={this.handleSubmit}/>
      </form>
    );
  }
}

export default AddTask;
