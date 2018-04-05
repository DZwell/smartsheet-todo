import React, { Component } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import CategoryFilter from './CategoryFilter.jsx';
import taskClient from '../clients/task';
import '../styles/index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      taskToEdit: {},
      categories: [],
      isFiltering: false,
      isLoading: false,
    }
    this.loadTaskToEdit = this.loadTaskToEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.filterByCategory = this.filterByCategory.bind(this);
  }

  async componentWillMount() {
    const results = await taskClient.getTasks();
    const categories = results.tasks.map(task => task.category).filter((item, index, inputArray) => inputArray.indexOf(item) == index);
    console.log(categories);
    this.setState({ tasks: results.tasks, categories });
  }


  loadTaskToEdit(task) {
    this.setState({ taskToEdit: task });
  }

  async handleSubmit(task, isEditing = false) {
    this.setState({ isLoading: true })
    if (isEditing) {
      await taskClient.editTask(task);
      const results = await taskClient.getTasks();
      this.setState({ tasks: results.tasks, isLoading: false });
    } else {
      await taskClient.addTask(task);
      const results = await taskClient.getTasks();
      this.setState({ tasks: results.tasks, isLoading: false });
    }
  }

  async handleDelete(id) {
    this.setState({ isLoading: true })
    await taskClient.deleteTask(id);
    const results = await taskClient.getTasks();
    this.setState({ tasks: results.tasks, isLoading: false });
  }

  async handleStatusChange(task) {
    this.setState({ isLoading: true })
    await taskClient.changeStatus(task);
    const results = await taskClient.getTasks();
    this.setState({ tasks: results.tasks, isLoading: false });
  }

  async filterByCategory(category) {
    const results = await taskClient.getTasksByCategory(category);
    this.setState({ tasks: results.tasks, isFiltering: true });
  }

  render() {
    return (
      <div className="app-container">
        <h1>Smartsheet To do</h1>
        <h1 hidden={!this.state.isLoading}>LOADING</h1>
        <AddTask
          loading={this.state.isLoading}
          edit={this.state.taskToEdit}
          onSubmit={this.handleSubmit}
        />
        <TaskList
          loading={this.state.isLoading}
          tasks={this.state.tasks}
          edit={this.loadTaskToEdit}
          delete={this.handleDelete}
          changeStatus={this.handleStatusChange}
        />
        <CategoryFilter 
          loading={this.state.isLoading}
          categories={this.state.categories}
          filter={this.filterByCategory}
        />
      </div>
    );
  }
}

export default App;
