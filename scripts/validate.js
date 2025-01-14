const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }) => {
    // Show input error
    const showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      if (errorElement) {
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
      } else {
        console.warn(`Error element for input #${inputElement.id} not found.`);
      }
    };
  
    // Hide input error
    const hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      if (errorElement) {
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(errorClass);
      }
    };
  
    // Validate input
    const isValid = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        hideInputError(formElement, inputElement);
      }
    };
  
    // Toggle button state
    const toggleButtonState = (inputList, buttonElement) => {
      const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
      if (hasInvalidInput) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
      }
    };
  
    // Set event listeners on form inputs
    const setEventListeners = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(inputSelector));
      const buttonElement = formElement.querySelector(submitButtonSelector);
  
      if (!buttonElement) {
        console.warn(`Submit button not found in form ${formElement}.`);
        return;
      }
  
      toggleButtonState(inputList, buttonElement);
  
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          isValid(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
        });
      });
    };
  
    // Initialize validation for each form
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((formElement) => {
      if (!formElement) {
        console.warn("Form element not found for selector:", formSelector);
        return;
      }
  
      formElement.addEventListener("submit", (evt) => evt.preventDefault());
      setEventListeners(formElement);
    });
  };
  
  // Call enableValidation with configuration
  enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error"
  });
  
