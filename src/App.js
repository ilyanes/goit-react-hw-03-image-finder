import React, { Component } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './Components/Searchbar/SearchBar.jsx';
import ImageGallery from './Components/ImageGallery/ImageGallery.jsx';
import Modal from './Components/Modal/Modal';
import Button from './Components/Button/Button.jsx';
import Loader from 'react-loader-spinner';

class App extends Component {
  state = {
    querry: '',
    showModal: false,
    largeImg: null,
    totalHits: null,
    page: 1,
    loading: false,
    imgLength: null,
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  onImageClick = e => {
    if ((e.target = 'IMG')) {
      this.toggleModal();
    }
    console.dir(e.currentTarget.dataset.src);
    this.setState({ largeImg: e.currentTarget.dataset.src });
  };

  onSearchSubmit = querry => {
    console.log(querry);
    this.setState({
      querry: querry,
      page: 1,
    });
  };
  totalHits = (totalHits, imgLength) => {
    totalHits === 0
      ? this.setState({
          totalHits: null,
        })
      : this.setState({
          totalHits: totalHits,
          imgLength: imgLength,
        });
  };

  onLoadMore = () => {
    console.log('кликнули на onLoadMore');
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };
  onLoading = () => {
    this.setState({ loading: !this.state.loading });
  };
  onError = () => {
    this.setState({});
  };

  render() {
    return (
      <div className="section">
        <SearchBar onSubmit={this.onSearchSubmit} />
        {this.state.loading && (
          <Loader
            type="Bars"
            className="spinner"
            color="#00BFFF"
            height={50}
            width={50}
          />
        )}
        <ImageGallery
          querry={this.state.querry}
          page={this.state.page}
          totalHits={this.totalHits}
          onClick={this.onImageClick}
          loading={this.onLoading}
        />

        {
          (this.state.totalHits > 12,
          this.state.totalHits > this.state.imgLength && (
            <Button onLoadMore={this.onLoadMore} />
          ))
        }
        {this.state.showModal && (
          <Modal onToggleModal={this.toggleModal}>
            <img src={this.state.largeImg} alt={this.state.querry} />
            <button
              className="closeBtn"
              type="button"
              onClick={this.toggleModal}
            >
              X
            </button>
          </Modal>
        )}
        <ToastContainer position="top-center" autoClose={1000} />
      </div>
    );
  }
}

export default App;
