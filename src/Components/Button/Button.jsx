import React, { Component } from 'react';
export default class Button extends Component {
  render() {
    return (
      <button className="Button" onClick={this.props.onLoadMore}>
        Load more
      </button>
    );
  }
}
