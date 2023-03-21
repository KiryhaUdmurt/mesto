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
  userName,
  userStatus,
} from "../utils/constants.js";
import Api from '../components/Api.js';
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const api = new Api('https://mesto.nomoreparties.co', 'a3c18fa0-3704-4ba8-ba34-414472677779');
api.getInitialCards().then((data) => {
  const cardList = new Section(
    {
      items: data,
      renderer: (item) => {
        const card = createCard(item);
        cardList.addItem(card);
      },
    },
    cards
  );
  
  cardList.renderItems();
}).catch((err) => {
  console.log(err);
})


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





api.getUserInformation().then((res) => {
  userName.textContent = res.name;
  userStatus.textContent = res.about;
})
.catch((err) => console.log(err));

const userInfo = new UserInfo({
  profileName: ".profile__name",
  profileInfo: ".profile__status",
});

const editProfilePopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      api.changeProfileInfo(data)
        .then((res) => {
          userInfo.setUserInfo({
            name: res.name,
            info: res.about
          });
      })
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
  // editProfilePopup.setInputValues(info);
  profileFormValidation.resetValidation();
  editProfilePopup.open();
});




const cardAddPopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      console.log(data)
      const card = createCard(data);
      console.log(card)
      cardList.prependItem(card);
      cardAddPopup.close();
      addCardFormValidation.disableSubmitButton();
    },
  },
  ".popup_type_card"
);

cardAddPopup.setEventListeners();

popupAddCardButton.addEventListener("click", () => {
  addCardFormValidation.resetValidation();
  cardAddPopup.open();
});
