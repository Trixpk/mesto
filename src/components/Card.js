export default class Card {
    constructor(options, cardSelector, user) {
        this._cardSelector = cardSelector;
        this._user = user;
        this._link = options.data.link;
        this._name = options.data.name;
        this._owner = options.data.owner;
        this._cardId = options.data._id;
        this._likes = options.data.likes;
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

    _removeTrashButton() {
        if(this._owner._id !== this._user._id) {
            this._element.querySelector('.cards__trash').remove();
        }
    }

    _updateLikesCount(count) {
        this._element.querySelector('.cards__like-counter').textContent = count;
    }

    _setEventListeners() {
        this._element.querySelector('.cards__trash').addEventListener('click', () => {
            this._handleDeleteIconClick(this);
        });

        this._element.querySelector('.cards__like').addEventListener('click', () => {
            this._handleLikeClick(this);
        });

        this._element.querySelector('.cards__img').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    getCardId() {
        return this._cardId;
    }

    isLiked() {
        const userLiked = this._likes.find(like => like._id == this._user._id);
        if(userLiked) {
            return true;
        }else {
            return false;
        }
    }

    likeToggle() {
        this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
    }

    updateLike(res) {
        this.likeToggle();
        this._updateLikesCount(res.likes.length);
        this._likes = res.likes;
    }

    removeElement() {
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        const cardTitle = this._element.querySelector('.cards__title');
        const cardImg = this._element.querySelector('.cards__img');
        const cardLikesCount = this._element.querySelector('.cards__like-counter');
        const likeElement = this._element.querySelector('.cards__like');
        this._setEventListeners();

        cardTitle.textContent = this._name;
        cardImg.src = this._link;
        cardImg.alt = this._name;
        cardLikesCount.textContent = this._likes.length;
        this._removeTrashButton();
        if(this.isLiked()) {
            likeElement.classList.add('cards__like_active');
        }

        return this._element;
    }
}