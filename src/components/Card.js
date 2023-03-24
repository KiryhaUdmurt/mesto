export default class Card {
  constructor(
    {
      data,
      userId,
      handleCardClick,
      handleLikeAdd,
      handleLikeDelete,
      handleDelete,
    },
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLikeAdd = handleLikeAdd;
    this._handleLikeDelete = handleLikeDelete;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImg = this._element.querySelector(".card__img");
    this._cardName = this._element.querySelector(".card__name");
    this._deleteButton = this._element.querySelector(".card__delete-btn");
    this._likeNumber = this._element.querySelector(".card__like-number");
    this._setEventListeners();
    this._checkUserDelete();
    this._isLiked();
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

  handleLikeCard(data) {
    this._likes = data.likes;
    this._likeButton.classList.toggle("card__like-button_active");
    this._likeNumber.textContent = this._likes.length;
  }

  _handleLikeButton() {
    if (this._likeButton.classList.contains("card__like-button_active")) {
      this._handleLikeDelete(this._id);
    } else {
      this._handleLikeAdd(this._id);
    }
  }

  deleteCard() {
    this._element.remove();
  }

  _checkUserDelete() {
    if (this._owner !== this._userId) {
      this._deleteButton.remove();
    }
  }

  _isLiked() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });
    this._cardImg.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
}
