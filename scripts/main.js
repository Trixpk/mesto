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

function createCard() {
    return document.querySelector('.card-template').content.cloneNode(true);
}

function addCard(event) {
    event.preventDefault();

    const cardElement = createCard();
    const cardsImg = cardElement.querySelector('.cards__img');
    cardsImg.src = cardLink.value;
    cardsImg.alt = cardName.value;
    cardElement.querySelector('.cards__title').textContent = cardName.value;

    cardsImg.addEventListener('click', function (evt) {
        if(evt.target.classList.contains('cards__img')) {
            popupDetailImg.querySelector('.card-detail__img').src = evt.target.src;
            popupDetailImg.querySelector('.card-detail__title').textContent = cardName;

            toggleModal(popupDetailImg);
        }
    });

    cardsSection.prepend(cardElement);

    toggleModal(popupAddForm);
}

initialCards.forEach(function (card) {
    const cardElement = createCard();
    const cardsImg = cardElement.querySelector('.cards__img');

    cardElement.querySelector('.cards__title').textContent = card.name;
    cardsImg.alt = card.name;
    cardsImg.src = card.link;

    cardsImg.addEventListener('click', function (evt) {
        if(evt.target.classList.contains('cards__img')) {
            cardDetailImg.src = evt.target.src;
            cardDetailTitle.textContent = card.name;

            toggleModal(popupDetailImg);
        }
    });

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

cardsSection.addEventListener('click', function (evt) {
    if(evt.target.classList.contains('cards__trash')) {
        evt.target.closest('.cards__item').remove();
    }else if (evt.target.classList.contains(('cards__like'))) {
        evt.target.classList.toggle('cards__like_active');
    }
});
