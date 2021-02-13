// validation
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, button) => {
    if(hasInvalidInput(inputList)) {
        button.classList.add('popup__submit_inactive');
    }else {
        button.classList.remove('popup__submit_inactive');
    }
};

const setEventListeners = (form) => {
    const fieldList = Array.from(form.querySelectorAll('.popup__field'));
    const button = form.querySelector('.popup__submit');
    toggleButtonState(fieldList, button);

    fieldList.forEach((field) => {
        field.addEventListener('input', () => {
            checkInputValidity(form, field);
            toggleButtonState(fieldList, button);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

enableValidation();

const showInputError = (form, input, errorMessage) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add('popup__field_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (form, input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove('popup__field_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (form, input) => {
    if(!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
    }else {
        hideInputError(form, input);
    }
};

const closePopupEsc = () => {
    document.addEventListener('keydown', (evt) => {
        if(evt.key === 'Escape') {
            const openedForm = document.querySelector('.popup_opened');
            if(openedForm !== null) {
                toggleModal(openedForm);
            }
        }
    });
};

closePopupEsc();