import './index.css';
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Popup from '../scripts/Popup.js';
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupConfirmDelete from '../scripts/PopupConfirmDelete.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
      authorization: '96e957a5-3fa6-45d2-8d74-380f98a0cb16',
      'Content-Type': 'application/json'
    }
});

api.getUserInfo()
.then((result) => {
    infoAboutMe = result;
    userInfo.setUserInfo(result);
    profileAvatar.src = result.avatar;
}).catch((error) => {
    console.log('Ошибка при добавлении информации о пользователе ' + error);
})

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__input-error_active'
};

let infoAboutMe;
const profileNameInput = document.querySelector('.popup__field_name'); 
const profileProfessionInput = document.querySelector('.popup__field_profession');
const profileAvatarInput = document.querySelector('.popup__field_avatar');
const profileAvatar = document.querySelector('.profile__avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-wrap');

const changeAvatarForm = document.querySelector('.popup_change-avatar').querySelector('.form');
const cardAddForm = document.querySelector('.popup_add-form').querySelector('.form');
const addFormSubmit = cardAddForm.querySelector('.popup__submit');
const profileEditForm = document.querySelector('.popup_edit-form').querySelector('.form');

const addFormValidate = new FormValidator(validationConfig, cardAddForm);
addFormValidate.enableValidation();

const editFormValidate = new FormValidator(validationConfig, profileEditForm);
editFormValidate.enableValidation();

const avatarFormValidate = new FormValidator(validationConfig, changeAvatarForm);
avatarFormValidate.enableValidation();

const popupWithImage = new PopupWithImage('.popup_detail-img');
popupWithImage.setEventListeners();

const createCard = (item) => {
    const card = new Card({
        data: item,
        handleCardClick: () => {
            popupWithImage.open(item);
        },
        handleLikeClick: (card) => {
            const isLikeResult = card.isLiked();
            const cardId = card.getCardId();
            if(isLikeResult) {
                api.deleteLike(cardId)
                .then((res) => {
                    card.updateLike(res);
                })
            }else {
                api.addLike(cardId)
                .then((res) => {
                    card.updateLike(res);
                })
                .catch((err) => {
                    console.log('Ошибка лайка карточки ' + err);
                });
            }
        },
        handleDeleteIconClick: (card) => {
            const cardId = card.getCardId();
            const popupDelConfirm = new PopupConfirmDelete(
                '.popup_del-confirm',
                () => {
                    api.deleteCard(cardId).then((res) => {
                        card.removeElement();
                        popupDelConfirm.close();
                    }).catch((err) => {
                        console.log('Ошибка удаления карточки ' + err);
                        popupDelConfirm.close();
                    })
                }
            );
            popupDelConfirm.open();
            popupDelConfirm.setEventListeners();
        }
    },
    '.card-template',
    infoAboutMe
    );
    return card.generateCard();
}

const cardsSection = new Section({
    items: {},
    renderer: createCard
}, '.cards');

const userInfo = new UserInfo(
    '.profile__name',
    '.profile__profession'
);

api.getInitialCards()
.then((res) => {
    cardsSection.items = res;
    cardsSection.renderItems(infoAboutMe._id);
})
.catch((err) => {
    console.log('Не удалось добавить карточки ' + err);
});

const popupAddForm = new PopupWithForm(
    '.popup_add-form',
    () => {
        const item = {
            name: cardAddForm.querySelector('.popup__field_name').value,
            link: cardAddForm.querySelector('.popup__field_link').value
        };

        popupAddForm.waitSave();
        api.addCard(item).then((res) => {
            const newCard = createCard(res);
            cardsSection.addItem(newCard);
            cardAddForm.reset();
            popupAddForm.close();
            popupAddForm.finishSave();
        }).catch((err) => {
            console.log('Ошибка добавления карточки ' + err);
        }).finally(() => {

        })
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
        const data = {
            name: profileNameInput.value,
            about: profileProfessionInput.value
        }

        popupEditForm.waitSave();
        api.setUserInfo(data).then((res) => {
            userInfo.setUserInfo(data);
            popupEditForm.close();
            popupEditForm.finishSave();
        }).catch((err) => {
            console.log('Ошибка редактирования профиля ' + error);
        })
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

const avatarPopup = new PopupWithForm(
    '.popup_change-avatar',
    () => {
        const data = {
            avatar: profileAvatarInput.value,
        }

        avatarPopup.waitSave();
        api.changeAvatar(data).then((res) => {
            profileAvatar.src = data.avatar;
            avatarPopup.close();
            avatarPopup.finishSave();
        }).catch((err) => {
            console.log('Ошибка при обновлении аватара ' + err);
        })
    }
);
avatarPopup.setEventListeners();

avatarButton.addEventListener('click', () => {
    avatarFormValidate.toggleButtonState();
    avatarPopup.open();
});