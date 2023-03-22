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
import PopupWithSubmit from '../components/PopupWithSubmit.js';

const api = new Api('https://mesto.nomoreparties.co', 'a3c18fa0-3704-4ba8-ba34-414472677779');

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, serverCards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(serverCards);
  })
  .catch((err) => {
    console.log(err);
  })

    
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, cards)

    
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

const popupWithSubmit = new PopupWithSubmit(".popup_type_delete");
popupWithSubmit.setEventListeners();

// const handleCardClick = (name, link) => {
//   popupWithImage.open(name, link);
// };

const  createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: () => {
      popupWithImage.open(data);
    },
    handleLike: () => {

    },
    handleDelete: () => {
      popupWithSubmit.open();
      popupWithSubmit.setSubmit(() => {
        api.deleteCard(card.getId())
          .then(() => {
            card.deleteCard();
            popupWithSubmit.close();
          })
          .catch((err) => {
            console.log(err)
          })
      })
    }},
    ".card-template");
  return card.generateCard();
}





// api.getUserInformation().then((res) => {
//   userName.textContent = res.name;
//   userStatus.textContent = res.about;
// })
// .catch((err) => console.log(err));

const userInfo = new UserInfo({
  profileName: ".profile__name",
  profileInfo: ".profile__status",
  avatar: ".profile__img"
});

const editProfilePopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      api.changeProfileInfo(data)
        .then((data) => {
          userInfo.setUserInfo({
            name: data.name,
            info: data.about
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
  profileFormValidation.resetValidation();
  editProfilePopup.open();
});




const cardAddPopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      api.addCard(data).then((data) => {
        const card = createCard(data);
        cardList.prependItem(card);
      })
      .catch(err => console.log(err));
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
