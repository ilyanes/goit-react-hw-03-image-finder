import React, { Component } from 'react';

export default class ImageGalleryItem extends Component {
  state = {
    images: [],
    perPage: 12,
    pageNumber: 1,
    totalHits: null,
    loading: false,
    error: false,
    imgLength: null,
  };
  pageDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.querry !== this.props.querry ||
      prevState.pageNumber !== this.props.page
    ) {
      if (this.props.page === 1) {
        prevState.images = [];
      }
      this.setState({
        pageNumber: this.props.page,
      });

      this.setState({ loading: true, error: false });
      this.props.loading(this.state.loading);

      const USER_KEY = '23049135-63d939595882c9f020474dd76';
      fetch(
        `https://pixabay.com/api/?q=${this.props.querry}&page=${this.state.pageNumber}&key=${USER_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`,
      )
        .then(r => r.json())
        .then(r => {
          this.setState({
            images: [...prevState.images, ...r.hits],
            totalHits: r.totalHits,
            imgLength: [...prevState.images, ...r.hits].length,
          });
          console.log(r);
          console.log(this.state.totalHits);
          this.props.totalHits(this.state.totalHits, this.state.imgLength);
          if (this.state.pageNumber !== 1) {
            this.pageDown();
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({
            images: [],
            totalHits: null,
            error: true,
            imgLength: null,
          });
          this.props.totalHits(this.state.totalHits);
        })
        .finally(() => {
          this.setState({ loading: false });
          this.props.loading(this.state.loading);
        });
    }
  }

  render() {
    return !this.state.error ? (
      this.state.totalHits !== 0 ? (
        this.state.images.map(image => (
          <li className="ImageGalleryItem" key={image.id}>
            <img
              onClick={this.props.onClick}
              src={image.webformatURL}
              data-src={image.largeImageURL}
              alt={image.tags}
              className="ImageGalleryItem-image"
            />
          </li>
        ))
      ) : (
        <h2 className="title"> No match found ...</h2>
      )
    ) : (
      <h2 className="title"> Something goes wrong ... </h2>
    );
  }
}
