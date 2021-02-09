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

let editButton = document.querySelector('.profile__edit-button');
let popupEditForm = document.querySelector('.popup_edit-form');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let nameInput = document.querySelector('.popup__field_name');
let professionInput = document.querySelector('.popup__field_profession');
let cardsSection = document.querySelector('.cards');
let addButton = document.querySelector('.profile__add-button');
let popupAddForm = document.querySelector('.popup_add-form');
let popupDetailImg = document.querySelector('.popup_detail-img');

function toggleModal(element) {
    element.classList.toggle('popup_opened');
}

function savePopup(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;

    toggleModal(popupEditForm);
}

function addCard(event) {
    event.preventDefault();

    let cardName = popupAddForm.querySelector('.popup__field_name').value;
    let cardLink = popupAddForm.querySelector('.popup__field_link').value;

    let cardElement = document.querySelector('.card-template').content.cloneNode(true);
    cardElement.querySelector('.cards__img').src = cardLink;
    cardElement.querySelector('.cards__title').textContent = cardName;

    cardElement.querySelector('.cards__img').addEventListener('click', function (evt) {
        if(evt.target.classList.contains('cards__img')) {
            popupDetailImg.querySelector('.card-detail__img').src = evt.target.src;
            popupDetailImg.querySelector('.card-detail__title').textContent = cardName;

            toggleModal(popupDetailImg);
        }
    });

    cardsSection.prepend(cardElement);

    popupAddForm.classList.remove('popup_opened');
}

initialCards.forEach(function (card) {
    let cardElement = document.querySelector('.card-template').content.cloneNode(true);

    cardElement.querySelector('.cards__title').textContent = card.name;
    cardElement.querySelector('.cards__img').src = card.link;

    cardElement.querySelector('.cards__img').addEventListener('click', function (evt) {
        if(evt.target.classList.contains('cards__img')) {
            popupDetailImg.querySelector('.card-detail__img').src = evt.target.src;
            popupDetailImg.querySelector('.card-detail__title').textContent = card.name;

            toggleModal(popupDetailImg);
        }
    });


    cardsSection.append(cardElement);

});

popupAddForm.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        toggleModal(popupAddForm);
    }
});

popupEditForm.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        toggleModal(popupEditForm);
    }
});

popupDetailImg.addEventListener('click', function (evt) {
   if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
       toggleModal(popupDetailImg);
   }
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
