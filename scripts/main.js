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

function savePopup(event) {
    event.preventDefault();

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
        if(evt.target.classList.contains('cards__img')) {
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
    event.preventDefault();

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
      if(evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
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