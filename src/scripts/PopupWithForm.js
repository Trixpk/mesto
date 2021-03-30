import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submit = submit;
        this._submitButton = this._form.querySelector('.popup__submit');
        this._submitText = this._submitButton.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submit);
    }

    close() {
        super.close();
        this._form.reset();
    }

    waitSave() {
        this._submitButton.textContent = 'Сохранение...';
    }

    finishSave() {
        this._submitButton.textContent = this._submitText;
    }
}