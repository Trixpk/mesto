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

function popupEscListener(event) {
    if(event.key == 'Escape') {
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

function setSubmitButtonState(form, isFormValid) {
    const button = form.querySelector('.popup__submit');
    if (isFormValid) {
        button.removeAttribute('disabled');
        button.classList.remove('popup__submit_inactive');
    } else {
        button.setAttribute('disabled', true);
        button.classList.add('popup__submit_inactive');
    }
}

function savePopup() {
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;

    popupEditForm.querySelector('.form').reset();
    setSubmitButtonState(popupEditForm, false);
    closePopup(popupEditForm);
}

function createCard(link, name) {
    const newCard = document.querySelector('.card-template').content.cloneNode(true);
    const newCardImg = newCard.querySelector('.cards__img');
    const newCardName = newCard.querySelector('.cards__title');
    const newCardButtonTrash = newCard.querySelector('.cards__trash');
    const newCardButtonLike = newCard.querySelector('.cards__like');
    newCardImg.src = link;
    newCardImg.alt = name;
    newCardName.textContent = name;

    newCardImg.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('cards__img')) {
            cardDetailImg.src = evt.target.src;
            cardDetailTitle.textContent = name;

            openPopup(popupDetailImg);
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
    popupAddForm.querySelector('.form').reset();
    setSubmitButtonState(popupAddForm, false);
    closePopup(popupAddForm);
}

initialCards.forEach(function (card) {
    const cardElement = createCard(card.link, card.name);

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
    openPopup(popupEditForm);
});

addButton.addEventListener('click', function () {
    openPopup(popupAddForm);
});

popupEditForm.querySelector('.form').addEventListener('submit', savePopup);

popupAddForm.querySelector('.popup__form').addEventListener('submit', addCard);