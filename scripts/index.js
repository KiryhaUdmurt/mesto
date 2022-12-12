const editButton = document.querySelector('.profile__edit-button');
const popUp = document.querySelector('.popup');
const closeButton = popUp.querySelector('.popup__close-icon');
const saveButton = popUp.querySelector('.popup__save-btn');
const popupContainer = popUp.querySelector('.popup__container')
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupName = popUp.querySelector('.popup__name');
const popupStatus = popUp.querySelector('.popup__status');
const popupForm = popUp.querySelector('.popup__form');

popupName.value = profileName.textContent;
popupStatus.value = profileStatus.textContent;

editButton.addEventListener('click', function() {
    popUp.classList.add('popup_opened');
});

closeButton.addEventListener('click', function() {
    popUp.classList.remove('popup_opened');
});

popUp.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
      popUp.classList.remove('popup_opened');
    }
});

function closePopup() {
    popUp.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    closePopup();
};

popupForm.addEventListener('submit', handleFormSubmit);



