export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._cardSelector = cardSelector;
        this._link = data.link;
        this._name = data.name;
        this._handleCardClick = handleCardClick;
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

    _setEventListeners() {
        this._element.querySelector('.cards__trash').addEventListener('click', () => {
            this._handleTrashClick();
        });

        this._element.querySelector('.cards__like').addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._element.querySelector('.cards__img').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        const cardTitle = this._element.querySelector('.cards__title');
        const cardImg = this._element.querySelector('.cards__img');
        this._setEventListeners();

        cardTitle.textContent = this._name;
        cardImg.src = this._link;
        cardImg.alt = this._name;

        return this._element;
    }
}