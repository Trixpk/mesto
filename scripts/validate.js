// validation
const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__input-error_active'
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (config, inputList, button) => {
    if(hasInvalidInput(inputList)) {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }else {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    }
};

const showInputError = (config, form, input, errorMessage) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (config, form, input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (form, input) => {
    if(!input.validity.valid) {
        showInputError(validationConfig, form, input, input.validationMessage);
    }else {
        hideInputError(validationConfig, form, input);
    }
};

const setEventListeners = (config, form) => {
    const fieldList = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);
    toggleButtonState(validationConfig, fieldList, button);

    fieldList.forEach((field) => {
        field.addEventListener('input', () => {
            checkInputValidity(form, field);
            toggleButtonState(validationConfig, fieldList, button);
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(validationConfig, formElement);
    });
};

enableValidation(validationConfig);

