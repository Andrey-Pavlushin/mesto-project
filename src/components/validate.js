export function enableValidation(formObject) {
  const form = document.querySelector(formObject.formSelector);
  const inputsCollection = document.querySelectorAll(formObject.inputSelector);
  const submitButton = document.querySelector(formObject.submitButtonSelector);

  form.addEventListener("input", (e) => {
    checkInputIsValid(form, e.target, formObject.inputErrorClass);

    toggleButtonState(
      inputsCollection,
      submitButton,
      formObject.inactiveButtonClass
    );
  });
}

function checkInputIsValid(form, input, inputErrorClass, errorClass) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    input.classList.add(inputErrorClass);
    showInputError(form, input, errorClass, input.validationMessage);
  } else {
    input.classList.remove(inputErrorClass);
    hideInputError(form, input, errorClass);
  }
}

const toggleButtonState = (inputs, submitButton, inactiveButtonClass) => {
  if (hasInvalidInput(inputs)) {
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(inactiveButtonClass);
  }
};

const hasInvalidInput = (inputs) =>
  Array.from(inputs).some((input) => !input.validity.valid);

const showInputError = (
  formElement,
  inputElement,
  errorClass,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log('errorElement: ', errorElement);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};
