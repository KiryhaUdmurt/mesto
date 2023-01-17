// объявление попапа имени и элементов профиля
const editButton = document.querySelector(".profile__edit-button");
const popUp = document.querySelector(".popup_type_profile");
const closeButton = popUp.querySelector(".popup__close-btn");
const saveButton = popUp.querySelector(".popup__save-btn");
const popupContainer = popUp.querySelector(".popup__container");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupName = popUp.querySelector(".popup__input_type_name");
const popupStatus = popUp.querySelector(".popup__input_type_status");
const popupForm = popUp.querySelector(".popup__form");

// фунция закрытия
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// функция открытия
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// подстановка данных
editButton.addEventListener("click", function () {
  openPopup(popUp);
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
});

closeButton.addEventListener("click", function () {
  closePopup(popUp);
});

popUp.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popUp);
  }
});

// отправка формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup(popUp);
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

function getCard(item) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardName = cardElement.querySelector(".card__name");
  cardImage.src = item.link;
  cardName.textContent = item.name;
  cardImage.alt = item.name;

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", function () {
    likeBtn.classList.toggle("card__like-button_active");
  });

  const deleteBtn = cardElement.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    openPopup(popUpImage);
    imagePopup.src = item.link;
    imageFigcaption.textContent = item.name;
  });

  return cardElement;
}

function renderCards() {
  initialCards.forEach((item) => {
    const cardHTML = getCard(item);
    cards.append(cardHTML);
  });
}

renderCards();

// объявление элементов попапа добавления
const popUpAdd = document.querySelector(".popup_type_card");
const popupAddForm = popUpAdd.querySelector(".popup__form");
const popupAddName = popUpAdd.querySelector(".popup__input_type_name");
const popupAddLink = popUpAdd.querySelector(".popup__input_type_link");
const popupAddSave = popUpAdd.querySelector(".popup__save-btn");
const popupAddClose = popUpAdd.querySelector(".popup__close-btn");

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
const addButton = document.querySelector(".profile__add-button");

addButton.addEventListener("click", function () {
  openPopup(popUpAdd);
});

// закрытие попапа добавления
popupAddClose.addEventListener("click", function () {
  closePopup(popUpAdd);
});

popUpAdd.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popUpAdd);
  }
});

// отправка формы
function addCardHandleFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const newCard = { name: popupAddName.value, link: popupAddLink.value };
  cards.prepend(getCard(newCard));
  closePopup(popUpAdd);
  popupAddForm.reset();
}

const addSubmit = popupAddForm.addEventListener("submit", addCardHandleFormSubmit);
