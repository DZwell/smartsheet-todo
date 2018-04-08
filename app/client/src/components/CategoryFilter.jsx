import React, { Component } from 'react';
import '../styles/index.css';



class CategoryFilter extends Component {
  constructor() {
    super()
    this.state = {
      selectedCategory: 'Filter by Category'
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(event) {
    this.setState({selectedCategory: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.filter(this.state.selectedCategory);
  }

  handleClear(event) {
    event.preventDefault();
    this.props.clear();
    this.setState({ selectedCategory: 'Filter by category' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <select disabled={this.props.loading} value={this.state.selectedCategory} onChange={this.handleChange}>
            <option disabled>{this.state.selectedCategory}</option>
            {this.props.categories.map((category, index) =>
              <option key={index} value={category}>{category}</option>
            )}
          </select>
        </label>
        <input disabled={this.props.loading} type="submit" value="Submit" />
        <button disabled={this.props.loading} onClick={this.handleClear}>Clear</button>
      </form>
    );
  }
}


export default CategoryFilter;
