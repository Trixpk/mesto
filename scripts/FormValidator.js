export default class FormValidator {
    constructor(config, form) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, button) {
        if(this._hasInvalidInput(inputList)) {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        }else {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        }
    }

    _showInputError(input, errorMessage) {
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(input) {
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _setEventListeners() {
        const fieldList = Array.from(this._form.querySelectorAll(this._inputSelector));
        const button = this._form.querySelector(this._submitButtonSelector);
        this._toggleButtonState(fieldList, button);

        fieldList.forEach((field) => {
            field.addEventListener('input', () => {
                this._checkInputValidity(field);
                this._toggleButtonState(fieldList, button);
            });
        });
    }

    _checkInputValidity(input) {
        if(!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
        }else {
            this._hideInputError(input);
        }
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }
}