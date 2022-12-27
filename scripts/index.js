const editButton = document.querySelector(".profile__edit-button");
const popUp = document.querySelector(".popup");
const closeButton = popUp.querySelector(".popup__close-btn");
const saveButton = popUp.querySelector(".popup__save-btn");
const popupContainer = popUp.querySelector(".popup__container");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupName = popUp.querySelector(".popup__input_type_name");
const popupStatus = popUp.querySelector(".popup__input_type_status");
const popupForm = popUp.querySelector(".popup__form");

function closePopup() {
  popUp.classList.remove("popup_opened");
}

editButton.addEventListener("click", function () {
  popUp.classList.add("popup_opened");
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
});

closeButton.addEventListener("click", closePopup);

popUp.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup();
}

const editSubmit = popupForm.addEventListener("submit", handleFormSubmit);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cards = document.querySelector(".elements__list");
const cardTemplate = document.querySelector(".card-template").content;

initialCards.forEach((item) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__img").src = item.link;
  cardElement.querySelector(".card__name").textContent = item.name;
  cards.append(cardElement);
});

const popupAdd = document.querySelector(".add-card-popup");
const popupAddForm = popupAdd.querySelector(".add-card-popup__form");
const popupAddName = popupAdd.querySelector(".add-card-popup__input_type_name");
const popupAddLink = popupAdd.querySelector(".add-card-popup__input_type_link");
const popupAddSave = popupAdd.querySelector(".add-card-popup__save-btn");
const popupAddClose = popupAdd.querySelector(".add-card-popup__close-btn");

const addButton = document.querySelector(".profile__add-button");

addButton.addEventListener("click", () => {
  popupAdd.classList.add("add-card-popup_opened");
  popupAddName.value = '';
  popupAddLink.value = '';
});

function closeAddPopup() {
  popupAdd.classList.remove("add-card-popup_opened");
}

popupAddClose.addEventListener("click", closeAddPopup);

popupAdd.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closeAddPopup();
  }
});

popupAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__img").src = popupAddLink.value;
  cardElement.querySelector(".card__name").textContent = popupAddName.value;
  cards.prepend(cardElement);
  closeAddPopup();
});
