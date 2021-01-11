let editButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let popupEditForm = document.querySelector('.popup__edit-form');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let nameInput = document.querySelector('.popup__field-name');
let professionInput = document.querySelector('.popup__field-profession');


function closeEditPopup() {
  popup.classList.remove('popup_opened');
}

function openEditPopup() {
  popup.classList.add('popup_opened');
}

function savePopup(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;

  closeEditPopup();
}

editButton.addEventListener('click', openEditPopup);
popupCloseButton.addEventListener('click', closeEditPopup);
popupEditForm.addEventListener('submit', savePopup);

