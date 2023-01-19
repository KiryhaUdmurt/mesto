// объявление попапа имени и элементов профиля
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

// фунция закрытия
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// функция открытия
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// подстановка данных
popupProfileEditButton.addEventListener("click", function () {
  openPopup(popUpProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileStatus.value = profileStatus.textContent;
});

popupProfileCloseButton.addEventListener("click", function () {
  closePopup(popUpProfile);
});

popUpProfile.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popUpProfile);
  }
});

// отправка формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileStatus.textContent = popupProfileStatus.value;
  closePopup(popUpProfile);
}

popupProfileForm.addEventListener("submit", handleFormSubmit);

const cards = document.querySelector(".elements__list");
const cardTemplate = document.querySelector(".card-template").content;

function getCard(item) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardName = cardElement.querySelector(".card__name");
  cardImage.src = item.link;
  cardName.textContent = item.name;
  cardImage.alt = item.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-button_active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    openPopup(popUpImage);
    imagePopup.src = item.link;
    imagePopup.alt = item.name;
    imageFigcaption.textContent = item.name;
  });

  return cardElement;
}

initialCards.forEach((item) => {
  const cardHTML = getCard(item);
  cards.append(cardHTML);
});

// объявление элементов попапа добавления
const popUpAddCard = document.querySelector(".popup_type_card");
const popupAddForm = popUpAddCard.querySelector(".popup__form");
const popupAddName = popUpAddCard.querySelector(".popup__input_type_name");
const popupAddLink = popUpAddCard.querySelector(".popup__input_type_link");
const popupAddSave = popUpAddCard.querySelector(".popup__save-btn");
const popupAddClose = popUpAddCard.querySelector(".popup__close-btn");

// попап картинки
const popUpImage = document.querySelector(".popup_type_image");
const popupImageClose = popUpImage.querySelector(".popup__close-btn");
const imagePopup = popUpImage.querySelector(".popup__image");
const imageFigcaption = popUpImage.querySelector(".popup__figcaption");

// закрытие попапа картинки
popupImageClose.addEventListener("click", function () {
  closePopup(popUpImage);
});

popUpImage.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popUpImage);
  }
});

// открытие попапа добавления
const popupAddCardButton = document.querySelector(".profile__add-button");

popupAddCardButton.addEventListener("click", function () {
  openPopup(popUpAddCard);
});

// закрытие попапа добавления
popupAddClose.addEventListener("click", function () {
  closePopup(popUpAddCard);
});

popUpAddCard.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popUpAddCard);
  }
});

// отправка формы
function addCardHandleFormSubmit(evt) {
  evt.preventDefault();
  const newCard = { name: popupAddName.value, link: popupAddLink.value };
  cards.prepend(getCard(newCard));
  closePopup(popUpAddCard);
  popupAddForm.reset();
}

popupAddForm.addEventListener("submit", addCardHandleFormSubmit);
