import { openPopup, popUpImage, imagePopup, imageFigcaption } from "./index.js";

export class Card {
    constructor(data, templateSelector, openPopup) {
        this._title = data.name;
        this._image = data.link;
        this._templateSelector = templateSelector;
        this._openPopup = openPopup;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__name').textContent = this._title;
        this._element.querySelector('.card__img').src = this._image;

        return this._element;
    }

    _handleLikeButton() {
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }
    
    _handleCardPreview() {
        this._openPopup(popUpImage);
        imagePopup.src = this._image;
        imagePopup.alt = this._title;
        imageFigcaption.textContent = this._title;
    }
    
    _setEventListeners() {
        this._element.querySelector('.card__like-button').addEventListener('click', () => {
            this._handleLikeButton();
        })
        this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
            this._element.remove();
        })
        this._element.querySelector('.card__img').addEventListener('click', () => {
            this._handleCardPreview();
        })
    }
}
