import './index.css';

import {
  popUpProfile,
  popupProfileEditButton,
  popupProfileName,
  popupProfileStatus,
  popupProfileForm,
  popUpAddCard,
  popupAddForm,
  popupAddCardButton,
  cards,
  popUpImage,
  initialCards,
  validationConfig,
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";


// экземпляры валидации
const profileFormValidation = new FormValidator(
  validationConfig,
  popupProfileForm
);
const addCardFormValidation = new FormValidator(validationConfig, popupAddForm);

profileFormValidation.enableValidation();
addCardFormValidation.enableValidation();

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

const  createCard = (item) => {
  const card = new Card(item, handleCardClick, ".card-template");
  return card.generateCard();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  cards
);

cardList.renderItems();

const userInfo = new UserInfo({
  profileName: ".profile__name",
  profileInfo: ".profile__status",
});

const editProfilePopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      userInfo.setUserInfo({
        name: data.name,
        info: data.job,
      });
      editProfilePopup.close();
    },
  },
  ".popup_type_profile"
);

editProfilePopup.setEventListeners();

popupProfileEditButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  popupProfileName.value = info.name;
  popupProfileStatus.value = info.info;
  editProfilePopup.open();
});

const cardAddPopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      const card = createCard(data);
      cards.prepend(card);
      cardAddPopup.close();
      addCardFormValidation.disableSubmitButton();
    },
  },
  ".popup_type_card"
);

cardAddPopup.setEventListeners();

popupAddCardButton.addEventListener("click", () => {
  cardAddPopup.open();
});
