export class Card {
  constructor(data, handleCardClick, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImg = this._element.querySelector(".card__img");
    this._cardName = this._element.querySelector(".card__name");
    this._deleteButton = this._element.querySelector(".card__delete-btn");
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._setEventListeners();

    this._cardName.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    return this._element;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._deleteButton.addEventListener("click", () => {
        this._element.remove();
      });
    this._cardImg.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
