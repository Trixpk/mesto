import '../pages/index.css';
import {initialCards} from "../scripts/initial-cards.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Popup from './Popup.js';
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__input-error_active'
};

const userInfo = new UserInfo('.profile__name', '.profile__profession');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const cardAddForm = document.querySelector('.popup_add-form').querySelector('.form');
const profileEditForm = document.querySelector('.popup_edit-form').querySelector('.form');

const addFormValidate = new FormValidator(validationConfig, cardAddForm);
addFormValidate.enableValidation();

const editFormValidate = new FormValidator(validationConfig, profileEditForm);
editFormValidate.enableValidation();

const cardsSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(
            item,
            '.card-template',
            () => {
                const popupDetailImg = new PopupWithImage('.popup_detail-img');
                popupDetailImg.open(item);
            }
        );
        const renderedElement = card.generateCard();
        return renderedElement;
    }
}, '.cards');
cardsSection.renderItems();

const popupAddForm = new PopupWithForm(
    '.popup_add-form',
    () => {
        const item = {};
        item.name = cardAddForm.querySelector('.popup__field_name').value;
        item.link = cardAddForm.querySelector('.popup__field_link').value;

        const card = new Card(
            item,
            '.card-template',
            () => {
                const popupDetailImg = new PopupWithImage('.popup_detail-img');
                popupDetailImg.open(item);
            }
        );
        const newCard = card.generateCard();
        cardsSection.addItem(newCard);
        cardAddForm.reset();
        popupAddForm.close();
    }
);
profileAddButton.addEventListener('click', () => {
    popupAddForm.open();
    popupAddForm.setEventListeners();
});

const popupEditForm = new PopupWithForm(
    '.popup_edit-form',
    () => {
        const profileName = profileEditForm.querySelector('.popup__field_name').value;
        const profileProfession = profileEditForm.querySelector('.popup__field_profession').value;

        userInfo.setUserInfo(profileName, profileProfession);

        popupEditForm.close();
    }
);

profileEditButton.addEventListener('click', () => {
    const inputValues = userInfo.getUserInfo();
    profileEditForm.querySelector('.popup__field_name').value = inputValues.name;
    profileEditForm.querySelector('.popup__field_profession').value = inputValues.info;
    profileEditForm.querySelector('.popup__submit').classList.remove('popup__submit_inactive');
    popupEditForm.open();
    popupEditForm.setEventListeners();
});