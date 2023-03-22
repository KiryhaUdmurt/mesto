export default class Card {
  constructor({data, handleCardClick, handleLike, handleDelete, userId}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImg = this._element.querySelector(".card__img");
    this._cardName = this._element.querySelector(".card__name");
    this._deleteButton = this._element.querySelector(".card__delete-btn");
    this._likeNumber = this._element.querySelector(".card__like-number");
    this._likes = data.likes;
    this._id = data.id;
    this._isOwner = data.owner._id === this._userId;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
    this._templateSelector = templateSelector;
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
    this._likeNumber.textContent = this._likes.length;
    this._checkUserDelete();

    return this._element;
  }

  getId() {
    return this._id;
  }

  // handleLike() {

  // }

  // handleDelete() {

  // }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._likeButton.classList.toggle("card__like-button_active");
    this._likeNumber.textContent = this._likes.length;
  }

  _handleLikeButton() {
    if(this._likeButton.classList.contains("card__like-button_active")) {

    };
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _checkUserDelete() {
    if (!this._isOwner) {
      this._deleteButton.remove();
    }
  }

  // _deleteCard() {
  //   this._element.remove();
  // }

  // _handleImageClick() {
  //   this._handleCardClick(this._name, this._link);
  // }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
        this._handleLike();
      });
    this._deleteButton.addEventListener("click", () => {
        this._handleDelete();
      });
    this._cardImg.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
}
