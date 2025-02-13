export default class Popup {
    constructor(selector) {
      this._popup = document.querySelector(selector);
      this._handleEscClose = this._handleEscClose.bind(this);
      this._selector = selector;
    }
  
    open() {
      
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  
    _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  
    setEventListeners() {
      if (this._selector === '.places__hidden-popup') {
        this._popup.querySelector('.places__card-closure').addEventListener('click', () => this.close());
      } else {
        this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
      }
      this._popup.addEventListener('mousedown', (event) => {
          if (event.target === this._popup) {
            this.close();
          }
    });
  }
  }
  