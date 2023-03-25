import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._openedImage = this._popup.querySelector(".popup__image");
    this._figCaption = this._popup.querySelector('.popup__figcaption');
  }

  open(data) {
      this._openedImage.src = data.link;
      this._figCaption.textContent = data.name;
      this._openedImage.alt = data.name;
      super.open();
  }
}
