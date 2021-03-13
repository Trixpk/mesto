import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCardImage = this._popup.querySelector('.card-detail__img');
        this._cardCaption = this._popup.querySelector('.card-detail__title');
    }

    open(item) {
        this._popupCardImage.src = item.link;
        this._popupCardImage.alt = item.name;
        this._cardCaption.textContent = item.name;

        super.open();
    }
}