import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._submit = submit;
    }

    _getInputValues() {
        const inputValues = this._form.querySelectorAll('.popup__field');
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', this._submit);
    }

    close() {
        super.close();

        this._form.reset();
    }
}