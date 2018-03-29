import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ tasks: res.tasks }))
      .catch(err => console.log(err));
  }

  async callApi() {
    const response = await fetch('/api/tasks/:id', { method: 'DELETE' });
    const body = await response.json();
    console.log(body);

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <h1>Tasks</h1>
        {this.state.tasks.map(task =>
          <li key={task.id}>{task.body}</li>
        )}
      </div>
    );
  }
}

export default App;
