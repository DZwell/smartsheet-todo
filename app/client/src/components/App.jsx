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
      isLoading: false,
    }
    this.loadTaskToEdit = this.loadTaskToEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.filterByCategory = this.filterByCategory.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  /**
   * Returns list of task categories minus duplicates and empty category fields
   * {Array} tasks
   */
  _buildCategoriesList = (tasks) => {
    return tasks.map(task => task.category).filter((item, index, inputArray) => inputArray.indexOf(item) === index && item !== undefined);
  }

  async componentWillMount() {
    this.setState({ isLoading: true });
    const results = await taskClient.sendRequest('GET', null, null);
    const categories = this._buildCategoriesList(results.tasks);
    this.setState({ tasks: results.tasks, isLoading: false, categories });
  }


  loadTaskToEdit(task) {
    this.setState({ taskToEdit: task });
  }

  async handleSubmit(task, isEditing = false) {
    this.setState({ isLoading: true });
    if (isEditing) {
      await taskClient.sendRequest('PUT', task, task.id);
      const results = await taskClient.sendRequest('GET', null, null);
      const categories = this._buildCategoriesList(results.tasks);
      this.setState({ tasks: results.tasks, isLoading: false, categories });
    } else {
      await taskClient.sendRequest('POST', task, null);
      const results = await taskClient.sendRequest('GET', null, null);
      const categories = this._buildCategoriesList(results.tasks);
      this.setState({ tasks: results.tasks, isLoading: false, categories });
    }
  }

  async handleDelete(id) {
    this.setState({ isLoading: true });
    await taskClient.sendRequest('DELETE', null, id);
    const results = await taskClient.sendRequest('GET', null, null);
    const categories = this._buildCategoriesList(results.tasks);
    this.setState({ tasks: results.tasks, isLoading: false, categories });
  }

  async handleStatusChange(task) {
    this.setState({ isLoading: true });
    await taskClient.sendRequest('PUT', task, task.id);
    const results = await taskClient.sendRequest('GET', null, null);
    this.setState({ tasks: results.tasks, isLoading: false });
  }

  async filterByCategory(category) {
    this.setState({ isLoading: true });
    const results = await taskClient.sendRequest('GET', null, category);
    this.setState({ tasks: results.tasks, isLoading: false });
  }

  async clearFilter() {
    this.setState({ isLoading: true });
    const results = await taskClient.sendRequest('GET', null, null);
    this.setState({ tasks: results.tasks, isLoading: false });
  }

  render() {
    return (
      <div className="app-container">
        <h1>Smartsheet To do</h1>
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
          categories={this.state.categories}
          filter={this.filterByCategory}
          loading={this.state.isLoading}
          clear={this.clearFilter}
        />
        <h1 hidden={!this.state.isLoading}>LOADING....</h1>
      </div>
    );
  }
}

export default App;
