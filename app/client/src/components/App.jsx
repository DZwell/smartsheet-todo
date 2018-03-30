import React, { Component } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import '../static/index.css';

class App extends Component {

  render() {
    return (
      <div className="app-container">
        <h1>Smartsheet To do</h1>
        <AddTask />
        <TaskList />
      </div>
    );
  }
}

export default App;
