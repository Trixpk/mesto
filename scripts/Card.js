import {popupEscListener, openPopup} from '../scripts/main.js';

export default class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._link = data.link;
        this._name = data.name;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.cards__item')
            .cloneNode(true);

        return cardElement;
    }

    _handleTrashClick() {
        this._element.remove();
    }

    _handleLikeClick() {
        this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
    }

    _handleImgClick() {
        this._cardDetailImgPopup = document.querySelector('.popup_detail-img');
        this._cardDetailImg = document.querySelector('.card-detail__img');
        this._cardDetailTitle = document.querySelector('.card-detail__title');

        this._cardDetailImg.src = this._link;
        this._cardDetailTitle.textContent = this._name;
        this._cardDetailImg.alt = this._name;

        openPopup(this._cardDetailImgPopup);
    }

    _setEventListeners() {
        this._element.querySelector('.cards__trash').addEventListener('click', () => {
            this._handleTrashClick();
        });

        this._element.querySelector('.cards__like').addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._element.querySelector('.cards__img').addEventListener('click', () => {
            this._handleImgClick();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.cards__title').textContent = this._name;
        this._element.querySelector('.cards__img').src = this._link;
        this._element.querySelector('.cards__img').alt = this._name;

        return this._element;
    }
}