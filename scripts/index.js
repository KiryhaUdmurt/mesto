const editButton = document.querySelector('.profile__edit-button');
const popUp = document.querySelector('.popup');
const closeButton = popUp.querySelector('.popup__close-btn');
const saveButton = popUp.querySelector('.popup__save-btn');
const popupContainer = popUp.querySelector('.popup__container')
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupName = popUp.querySelector('.popup__input_type_name');
const popupStatus = popUp.querySelector('.popup__input_type_status');
const popupForm = popUp.querySelector('.popup__form');

function closePopup() {
    popUp.classList.remove('popup_opened');
}

editButton.addEventListener('click', function() {
    popUp.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
});

closeButton.addEventListener('click', closePopup);

popUp.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
      closePopup();
    }
});

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    closePopup();
};

popupForm.addEventListener('submit', handleFormSubmit);