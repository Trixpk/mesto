export default class Card {
    constructor(options, cardSelector) {
        this._cardSelector = cardSelector;
        this._link = options.data.link;
        this._name = options.data.name;
        this._owner = options.data.owner;
        this._cardId = options.data._id;
        this._likes = options.data.likes;
        this._handleCardClick = options.handleCardClick;
        this._handleLikeClick = options.handleLikeClick;
        this._handleDeleteIconClick = options.handleDeleteIconClick;
        this._isLiked = true;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.cards__item')
            .cloneNode(true);

        return cardElement;
    }

    checkLike(userId) {
        if(this._likes.find(item => item._id == userId)) {
            this._isLiked = true;
        }else {
            this._isLiked = false;
        }
    }

    _toggleLike() {
        if(this._isLiked) {
            this._element.querySelector('.cards__like').classList.add('cards__like_active');
        }else {
            this._element.querySelector('.cards__like').classList.remove('cards__like_active');
        }
    }

    updateLikesCount(count) {
        this._element.querySelector('.cards__like-counter').textContent = count;
    }

    _setEventListeners() {
        this._element.querySelector('.cards__trash').addEventListener('click', () => {
            this._handleDeleteIconClick();
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
        const cardLikesCount = this._element.querySelector('.cards__like-counter');
        this._setEventListeners();

        cardTitle.textContent = this._name;
        cardImg.src = this._link;
        cardImg.alt = this._name;
        cardLikesCount.textContent = this._likes.length;

        this._toggleLike();

        return this._element;
    }
}