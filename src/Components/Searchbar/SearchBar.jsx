import React, { Component } from 'react';
import { toast } from 'react-toastify';
class SearchBar extends Component {
  state = {
    searchQuerry: '',
  };
  onSearchFormChange = e => {
    this.setState({ searchQuerry: e.currentTarget.value });
  };
  onSubmitForm = e => {
    e.preventDefault();
    if (this.state.searchQuerry.trim() === '') {
      toast.warn('No data entered');
      return;
    }
    this.props.onSubmit(this.state.searchQuerry);
    this.setState({ searchQuerry: '' });
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmitForm}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onSearchFormChange}
            value={this.state.searchQuerry}
          />
        </form>
      </header>
    );
  }
}
export default SearchBar;
