export default class Card {
    constructor(options, cardSelector) {
        this._cardSelector = cardSelector;
        this._link = options.data.link;
        this._name = options.data.name;
        this._id = options.data._id;
        this._likesCount = options.data.likes.length;
        this._handleCardClick = options.handleCardClick;
        this._handleLikeClick = options.handleLikeClick;
        this._handleDeleteIconClick = options.handleDeleteIconClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.cards__item')
            .cloneNode(true);

        return cardElement;
    }

    changeLikeColor() {
        this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
    }

    updateLikesCount(count) {
        this._element.querySelector('.cards__like-counter').textContent = count;
    }

    _setEventListeners() {
        this._element.querySelector('.cards__trash').addEventListener('click', () => {
            this._handleDeleteIconClick();
        });

        this._element.querySelector('.cards__like').addEventListener('click', () => {
            this._handleLikeClick(this._id);
        });

        this._element.querySelector('.cards__img').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        const cardTitle = this._element.querySelector('.cards__title');
        const cardImg = this._element.querySelector('.cards__img');
        const cardLikesCount = this._element.querySelector('.cards__like-counter');
        this._setEventListeners();

        cardTitle.textContent = this._name;
        cardImg.src = this._link;
        cardImg.alt = this._name;
        cardLikesCount.textContent = this._likesCount;

        return this._element;
    }
}