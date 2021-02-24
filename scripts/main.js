import {initialCards} from '../scripts/initial-cards.js';
import {validationConfig} from '../scripts/validate-config.js';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup_edit-form');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameInput = document.querySelector('.popup__field_name');
const professionInput = document.querySelector('.popup__field_profession');
const cardsSection = document.querySelector('.cards');
const addButton = document.querySelector('.profile__add-button');
const popupAddForm = document.querySelector('.popup_add-form');
const cardName = popupAddForm.querySelector('.popup__field_name');
const cardLink = popupAddForm.querySelector('.popup__field_link');
const popups = document.querySelectorAll('.popup');

const cardAddForm = document.querySelector('.popup_add-form').querySelector('.form');
const profileEditForm = document.querySelector('.popup_edit-form').querySelector('.form');

const addFormValidate = new FormValidator(validationConfig, cardAddForm);
addFormValidate.enableValidation();

const editFormValidate = new FormValidator(validationConfig, profileEditForm);
editFormValidate.enableValidation();

function popupEscListener(event) {
    if (event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', popupEscListener);
}

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', popupEscListener);
}

function setSubmitButtonState(config, form, isFormValid) {
    const button = form.querySelector(config.submitButtonSelector);
    if (isFormValid) {
        button.removeAttribute('disabled');
        button.classList.remove(config.inactiveButtonClass);
    } else {
        button.setAttribute('disabled', true);
        button.classList.add(config.inactiveButtonClass);
    }
}

function savePopup() {
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;

    popupEditForm.querySelector('.form').reset();
    setSubmitButtonState(validationConfig, popupEditForm, false);
    closePopup(popupEditForm);
}


function addCard(event) {
    const dataCard = {
        name: cardLink.value,
        link: cardName.value
    };
    const card = new Card(dataCard, '.card-template');
    const cardElement = card.generateCard();


    cardsSection.prepend(cardElement);
    popupAddForm.querySelector('.form').reset();
    setSubmitButtonState(validationConfig, popupAddForm, false);
    closePopup(popupAddForm);
}

initialCards.forEach((item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.generateCard();

    cardsSection.append(cardElement);
});

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});

editButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    professionInput.value = profileProfession.textContent;
    setSubmitButtonState(validationConfig, popupEditForm, true);
    openPopup(popupEditForm);
});

addButton.addEventListener('click', function () {
    openPopup(popupAddForm);
});

popupEditForm.querySelector('.form').addEventListener('submit', savePopup);

popupAddForm.querySelector('.popup__form').addEventListener('submit', addCard);