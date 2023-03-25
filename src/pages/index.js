import "./index.css";

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
  popupAvatarEditButton,
  popupAvatar,
  popupAvatarForm,
  avatar,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import { data } from "autoprefixer";

const api = new Api(
  "https://mesto.nomoreparties.co",
  "a3c18fa0-3704-4ba8-ba34-414472677779"
);

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, serverCards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(serverCards);
  })
  .catch((err) => {
    console.log(err);
  });

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  cards
);

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

const popupWithSubmit = new PopupWithSubmit(".popup_type_delete");
popupWithSubmit.setEventListeners();

const userInfo = new UserInfo({
  profileName: ".profile__name",
  profileInfo: ".profile__status",
  avatar: ".profile__img",
});


// ПРОФИЛЬ
const editProfilePopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      editProfilePopup.loading(true);
      api
        .changeProfileInfo(data)
        .then((data) => {
          userInfo.setUserInfo(data);
          editProfilePopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          editProfilePopup.loading(false);
        });
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


// АВАТАР
const editAvatarPopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      editAvatarPopup.loading(true);
      api
        .changeAvatar(data)
        .then((data) => {
          userInfo.setUserInfo(data);
          editAvatarPopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          editAvatarPopup.loading(false);
        });
    },
  },
  ".popup_type_avatar"
);

editAvatarPopup.setEventListeners();

popupAvatarEditButton.addEventListener("click", () => {
  avatarFormValidation.resetValidation();
  editAvatarPopup.open();
});


// ДОБАВЛЕНИЕ КАРТОЧКИ
const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      userId: userInfo.getUserId(),
      handleCardClick: () => {
        popupWithImage.open(data);
      },
      handleLikeAdd: () => {
        api
          .addLike(card.getId())
          .then((data) => {
            card.handleLikeCard(data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleLikeDelete: () => {
        api
          .deleteLike(card.getId())
          .then((data) => {
            card.handleLikeCard(data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleDelete: () => {
        popupWithSubmit.open();
        popupWithSubmit.setSubmit(() => {
          api
            .deleteCard(card.getId())
            .then(() => {
              card.deleteCard();
              popupWithSubmit.close();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
    },
    ".card-template"
  );
  return card.generateCard();
};

const cardAddPopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      cardAddPopup.loading(true);
      api
        .addCard(data)
        .then((data) => {
          const card = createCard(data);
          cardList.prependItem(card);
          cardAddPopup.close();
          addCardFormValidation.disableSubmitButton();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          cardAddPopup.loading(false);
        });
    },
  },
  ".popup_type_card"
);

cardAddPopup.setEventListeners();

popupAddCardButton.addEventListener("click", () => {
  addCardFormValidation.resetValidation();
  cardAddPopup.open();
});

// экземпляры валидации
const profileFormValidation = new FormValidator(validationConfig, popupProfileForm);
const addCardFormValidation = new FormValidator(validationConfig, popupAddForm);
const avatarFormValidation = new FormValidator(validationConfig, popupAvatarForm);

profileFormValidation.enableValidation();
addCardFormValidation.enableValidation();
avatarFormValidation.enableValidation();
