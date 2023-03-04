export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close-btn');
        this._escClose = this._handleEscClose.bind(this);
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', this.close.bind(this));
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
              this.close();
            };
          });
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._escClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._escClose);
    }
}