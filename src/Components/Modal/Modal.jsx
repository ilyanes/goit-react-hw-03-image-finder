import React, { Component } from 'react';
import { createPortal } from 'react-dom';
// import styles from './Modal.module.css';
// import ContactForm from '../ContactForm/ContactForm.jsx';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.idEscapeEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.idEscapeEvent);
  }

  idEscapeEvent = e => {
    if (e.code === 'Escape') {
      this.props.onToggleModal();
    }
  };

  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onToggleModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.onBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
