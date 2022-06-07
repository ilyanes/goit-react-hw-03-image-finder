import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    return (
      <ul className="ImageGallery">
        <ImageGalleryItem
          querry={this.props.querry}
          page={this.props.page}
          totalHits={this.props.totalHits}
          onClick={this.props.onClick}
          loading={this.props.loading}
        />
      </ul>
    );
  }
}
