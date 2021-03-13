import './index.css';
import {initialCards} from "../scripts/initial-cards.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Popup from '../scripts/Popup.js';
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__input-error_active'
};

const userInfo = new UserInfo('.profile__name', '.profile__profession');
const profileNameInput = document.querySelector('.popup__field_name'); 
const profileProfessionInput = document.querySelector('.popup__field_profession');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const cardAddForm = document.querySelector('.popup_add-form').querySelector('.form');
const addFormSubmit = cardAddForm.querySelector('.popup__submit');
const profileEditForm = document.querySelector('.popup_edit-form').querySelector('.form');

const addFormValidate = new FormValidator(validationConfig, cardAddForm);
addFormValidate.enableValidation();

const editFormValidate = new FormValidator(validationConfig, profileEditForm);
editFormValidate.enableValidation();

const popupWithImage = new PopupWithImage('.popup_detail-img');
popupWithImage.setEventListeners();

const createCard = (item) => {
    const card = new Card(
        item,
        '.card-template',
        () => {
            popupWithImage.open(item);
        }
    );
    return card.generateCard();
}

const cardsSection = new Section({
    items: initialCards,
    renderer: createCard
}, '.cards');
cardsSection.renderItems();

const popupAddForm = new PopupWithForm(
    '.popup_add-form',
    () => {
        const item = {};
        item.name = cardAddForm.querySelector('.popup__field_name').value;
        item.link = cardAddForm.querySelector('.popup__field_link').value;

        const newCard = createCard(item);
        cardsSection.addItem(newCard);
        cardAddForm.reset();
        popupAddForm.close();
    }
);
popupAddForm.setEventListeners();

profileAddButton.addEventListener('click', () => {
    addFormValidate.toggleButtonState();
    popupAddForm.open();
});

const popupEditForm = new PopupWithForm(
    '.popup_edit-form',
    () => {
        userInfo.setUserInfo(profileNameInput.value, profileProfessionInput.value);

        popupEditForm.close();
    }
);
popupEditForm.setEventListeners();

profileEditButton.addEventListener('click', () => {
    const inputValues = userInfo.getUserInfo();
    profileNameInput.value = inputValues.name;
    profileProfessionInput.value = inputValues.info;

    editFormValidate.toggleButtonState();
    popupEditForm.open();
});