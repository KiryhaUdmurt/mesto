import { Card } from "./Card.js";
import { initialCards, validationConfig } from "./constants.js";
import { FormValidator } from "./FormValidator.js";


// объявление попапа элементов профиля
const popups = document.querySelectorAll('.popup');
const popupProfileEditButton = document.querySelector(".profile__edit-button");
const popUpProfile = document.querySelector(".popup_type_profile");
const popupProfileCloseButton = popUpProfile.querySelector(".popup__close-btn");
// const popupProfileSaveButton = popUpProfile.querySelector(".popup__save-btn");
// const popupProfileContainer = popUpProfile.querySelector(".popup__container");
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
const profileFormValidation = new FormValidator(validationConfig, popupProfileForm);
const addCardFormValidation = new FormValidator(validationConfig, popupAddForm);


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
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileStatus.textContent = popupProfileStatus.value;
  closePopup(popUpProfile);
};

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

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

const handleOpenPopup = (name, link) => {
  openPopup(popUpImage);
  imagePopup.src = link;
  imagePopup.alt = name;
  imageFigcaption.textContent = name;
}

// отправка формы добавления карточки
function addCardHandleFormSubmit(evt) {
  evt.preventDefault();
  cards.prepend(createCard({ name: popupAddName.value, link: popupAddLink.value }));
  closePopup(popUpAddCard);
  popupAddForm.reset();
  addCardFormValidation.disableSubmitButton();
};

popupAddForm.addEventListener("submit", addCardHandleFormSubmit);

function createCard(item) {
  const card = new Card(item, '.card-template', handleOpenPopup);
  return card.generateCard();
  
}

// получение карточек из объекта
initialCards.forEach((item) => {
  cards.append(createCard(item));
});

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

// включение валидации форм
profileFormValidation.enableValidation();
addCardFormValidation.enableValidation();

