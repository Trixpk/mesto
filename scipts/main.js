const editButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');

function closeEditPopup() {
  popup.classList.remove('popup_opened');
}

function openEditPopup() {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openEditPopup);
popupCloseButton.addEventListener('click', closeEditPopup);