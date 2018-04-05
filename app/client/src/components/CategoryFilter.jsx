import React, { Component } from 'react';
import '../styles/index.css';



class CategoryFilter extends Component {
  constructor() {
    super()
    this.state = {
      selectedCategory: 'Filter by category'
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({selectedCategory: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.filter(this.state.selectedCategory);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <select disabled={this.props.loading} value={this.state.selectedCategory} onChange={this.handleChange}>
            <option disabled>Filter by category</option>
            {this.props.categories.map((category, index) =>
              <option key={index} value={category}>{category}</option>
            )}
          </select>
        </label>
        <input disabled={this.props.loading} type="submit" value="Submit" />
      </form>
    );
  }
}


export default CategoryFilter;
