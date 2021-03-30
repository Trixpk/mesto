import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._submit = submit;
    }

    setSubmitHandler(submit) {
        this._submit = submit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit();
        });
    }
}