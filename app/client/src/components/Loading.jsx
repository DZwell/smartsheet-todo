import React, { Component } from 'react';
import '../styles/index.css';



class Loading extends Component {
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <select value={this.state.selectedCategory} onChange={this.handleChange}>
            <option disabled>Filter by category</option>
            {this.props.categories.map((category, index) =>
              <option key={index} value={category}>{category}</option>
            )}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


export default Loading;
