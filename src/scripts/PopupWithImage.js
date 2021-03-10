import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    open(item) {
        const detailImg = this._popup.querySelector('.card-detail__img');
        const detailTitle = this._popup.querySelector('.card-detail__title');

        detailImg.src = item.link;
        detailImg.alt = item.name;
        detailTitle.textContent = item.name;

        super.open();
        
        super.setEventListeners();
    }
}