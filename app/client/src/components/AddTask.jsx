import React, { Component } from 'react';
import '../styles/index.css';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      dueDate: '',
      completed: false,
      category: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
 * Clears state
 * @param {Object} state 
 */
  _resetState() {
    this.setState({
      body: '',
      category: '',
      dueDate: '',
    })
  }


  componentWillReceiveProps(nextProps) {
    // Populate input fields with task to edit
    if (nextProps.edit.id !== this.props.edit.id) {
      this.setState({
        body: nextProps.edit.body,
        category: nextProps.edit.category,
        dueDate: nextProps.edit.dueDate
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
    event.preventDefault();
    let isEditing;
    if (Object.keys(this.props.edit).length > 0) {
      isEditing = true;
      const taskWithId = Object.assign({}, this.state, { id: this.props.edit.id });
      this.props.onSubmit(taskWithId, isEditing);
    } else {
      this.props.onSubmit(this.state)
    }
    this._resetState();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Add a task here:
          <input required disabled={this.props.loading} placeholder="Task body" name="body" type="text" value={this.state.body} onChange={this.handleChange} />
        </label>
        <label>
          Category:
          <input disabled={this.props.loading} placeholder="Category" name="category" type="text" value={this.state.category} onChange={this.handleChange} />
        </label>
        <label>
          Due date:
          <input required disabled={this.props.loading} type="date" name="dueDate" value={this.state.dueDate} onChange={this.handleChange} />
        </label>
        <input disabled={this.props.loading} type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddTask;
