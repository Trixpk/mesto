const editButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupEditForm = document.querySelector('.popup__edit-form');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');



function closeEditPopup() {
  popup.classList.remove('popup_opened');
}

function openEditPopup() {
  popup.classList.add('popup_opened');
}

function savePopup(event) {
  event.preventDefault();

  let nameInput = document.querySelector('.popup__field-name');
  let professionInput = document.querySelector('.popup__field-profession');

  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;

  closeEditPopup();
}

editButton.addEventListener('click', openEditPopup);
popupCloseButton.addEventListener('click', closeEditPopup);
popupEditForm.addEventListener('submit', savePopup);

