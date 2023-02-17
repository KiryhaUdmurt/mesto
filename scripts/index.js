import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { FormValidator } from "./FormValidator.js";


// объявление попапа элементов профиля
const popups = document.querySelectorAll('.popup');
const popupProfileEditButton = document.querySelector(".profile__edit-button");
const popUpProfile = document.querySelector(".popup_type_profile");
const popupProfileCloseButton = popUpProfile.querySelector(".popup__close-btn");
const popupProfileSaveButton = popUpProfile.querySelector(".popup__save-btn");
const popupProfileContainer = popUpProfile.querySelector(".popup__container");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupProfileName = popUpProfile.querySelector(".popup__input_type_name");
const popupProfileStatus = popUpProfile.querySelector(".popup__input_type_status");
const popupProfileForm = popUpProfile.querySelector(".popup__form");

// объявление элементов попапа добавления
const popUpAddCard = document.querySelector(".popup_type_card");
const popupAddForm = popUpAddCard.querySelector(".popup__form");
const popupAddName = popUpAddCard.querySelector(".popup__input_type_name");
const popupAddLink = popUpAddCard.querySelector(".popup__input_type_link");
const popupAddSave = popUpAddCard.querySelector(".popup__save-btn");
const popupAddClose = popUpAddCard.querySelector(".popup__close-btn");
// кнопка попапа добавления
const popupAddCardButton = document.querySelector(".profile__add-button");
// область для карточек
const cards = document.querySelector(".elements__list");

// попап картинки
const popUpImage = document.querySelector(".popup_type_image");
const popupImageClose = popUpImage.querySelector(".popup__close-btn");
const imagePopup = popUpImage.querySelector(".popup__image");
const imageFigcaption = popUpImage.querySelector(".popup__figcaption");

// экземпляры валидации
const profileFormValidation = new FormValidator(config, popupProfileForm);
const addCardFormValidation = new FormValidator(config, popupAddForm);

// объект настроек валидации
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message_active'
};


// фунция закрытия
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', handleEscClose);
};

// функция открытия
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', handleEscClose);
};

// подстановка данных
popupProfileEditButton.addEventListener("click", function () {
  openPopup(popUpProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileStatus.value = profileStatus.textContent;
});

popupProfileCloseButton.addEventListener("click", function () {
  closePopup(popUpProfile);
});

// отправка формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileStatus.textContent = popupProfileStatus.value;
  closePopup(popUpProfile);
};

popupProfileForm.addEventListener("submit", handleFormSubmit);

// закрытие попапа картинки
popupImageClose.addEventListener("click", function () {
  closePopup(popUpImage);
});

// открытие попапа добавления карточки
popupAddCardButton.addEventListener("click", function () {
  openPopup(popUpAddCard);
});

// закрытие попапа добавления 
popupAddClose.addEventListener("click", function () {
  closePopup(popUpAddCard);
});

// отправка формы добавления карточки
function addCardHandleFormSubmit(evt) {
  evt.preventDefault();
  cards.prepend(createCard());
  closePopup(popUpAddCard);
  popupAddForm.reset();
  popupAddSave.setAttribute('disabled', true);
  popupAddSave.classList.add('popup__save-btn_inactive');
};

popupAddForm.addEventListener("submit", addCardHandleFormSubmit);

function createCard() {
  const card = new Card({ name: popupAddName.value, link: popupAddLink.value }, '.card-template');
  const cardElement = card.generateCard();
  return cardElement
}

// Закрытие по оверлею
popups.forEach((popup) => {
  popup.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup)
    };
  });
});

// Закрытие с Esc
const handleEscClose = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

// получение карточек из объекта
initialCards.forEach((item) => {
  const card = new Card(item, '.card-template', openPopup);
  const cardElement = card.generateCard();

  cards.append(cardElement);
});

// включение валидации форм
profileFormValidation.enableValidation();
addCardFormValidation.enableValidation();

export {popUpImage, imagePopup, imageFigcaption};
