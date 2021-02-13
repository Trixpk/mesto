const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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
const popupDetailImg = document.querySelector('.popup_detail-img');
const cardDetailImg = popupDetailImg.querySelector('.card-detail__img');
const cardDetailTitle = popupDetailImg.querySelector('.card-detail__title');
const popups = document.querySelectorAll('.popup');

function toggleModal(element) {
    element.classList.toggle('popup_opened');
}

function savePopup() {
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;

    toggleModal(popupEditForm);
}

function createCard(link, name) {
    const newCard = document.querySelector('.card-template').content.cloneNode(true);
    const newCardImg = newCard.querySelector('.cards__img');
    const newCardName = newCard.querySelector('.cards__title');
    const newCardButtonTrash = newCard.querySelector('.cards__trash');
    const newCardButtonLike = newCard.querySelector('.cards__like');
    newCardImg.src = link;
    newCardImg.alt = name;
    newCardTitle = newCardName.textContent = name;

    newCardImg.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('cards__img')) {
            cardDetailImg.src = evt.target.src;
            cardDetailTitle.textContent = name;

            toggleModal(popupDetailImg);
        }
    });

    newCardButtonTrash.addEventListener('click', function () {
        newCardButtonTrash.closest('.cards__item').remove();
    });

    newCardButtonLike.addEventListener('click', function () {
        newCardButtonLike.classList.toggle('cards__like_active');
    });

    return newCard;
}

function addCard(event) {
    const cardElement = createCard(cardLink.value, cardName.value);
    cardsSection.prepend(cardElement);
    toggleModal(popupAddForm);
}

initialCards.forEach(function (card) {
    const cardElement = createCard(card.link, card.name);

    cardsSection.append(cardElement);

});

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
            toggleModal(popup);
        }
    });
});

editButton.addEventListener('click', function () {
    toggleModal(popupEditForm);
});

addButton.addEventListener('click', function () {
    toggleModal(popupAddForm);
});

popupEditForm.addEventListener('submit', savePopup);

popupAddForm.querySelector('.popup__form').addEventListener('submit', addCard);

// validation
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, button) => {
    if(hasInvalidInput(inputList)) {
        button.classList.add('popup__submit_inactive');
    }else {
        button.classList.remove('popup__submit_inactive');
    }
};

const setEventListeners = (form) => {
    const fieldList = Array.from(form.querySelectorAll('.popup__field'));
    const button = form.querySelector('.popup__submit');
    toggleButtonState(fieldList, button);

    fieldList.forEach((field) => {
        field.addEventListener('input', () => {
            checkInputValidity(form, field);
            toggleButtonState(fieldList, button);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

enableValidation();

const showInputError = (form, input, errorMessage) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add('popup__field_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (form, input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove('popup__field_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (form, input) => {
    if(!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
    }else {
        hideInputError(form, input);
    }
};

const closePopupEsc = () => {
    document.addEventListener('keydown', (evt) => {
        if(evt.key === 'Escape') {
            const openedForm = document.querySelector('.popup_opened');
            if(openedForm !== null) {
                toggleModal(openedForm);
            }
        }
    });
};

closePopupEsc();