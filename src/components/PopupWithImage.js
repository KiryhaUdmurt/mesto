import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._openedImage = document.querySelector(".popup__image");
    this._figCaption = document.querySelector('.popup__figcaption');
  }

  open(name, link) {
      this._openedImage.src = link;
      this._figCaption.textContent = name;
      this._openedImage.alt = name;
      super.open();
  }
}
