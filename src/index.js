import { createCard, initialCards } from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import "./pages/index.css";

document.addEventListener("DOMContentLoaded", () => {
  const popupImage = document.querySelector(".popup-image");
  const popupImageUrl = document.querySelector(".popup-image__url");
  const popupImageText = document.querySelector(".popup-image__text");
  const popupImageCloseButton = document.querySelector(
    ".popup-image__close-button"
  );

  const popupProfile = document.querySelector(".popup-profile");
  const popupProfileCloseButton = document.querySelector(
    ".popup-profile__close-button"
  );

  const popupCard = document.querySelector(".popup-card");
  const popupCardCloseButton = document.querySelector(
    ".popup-card__close-button"
  );

  const profileName = document.querySelector(".profile__name");
  const profileCaption = document.querySelector(".profile__caption");
  const popupProfileOpenButton = document.querySelector(
    ".profile__edit-button"
  );
  const popupEditCardButton = document.querySelector(".profile__add-button");

  const profilePopupForm = document.querySelector(".form-profile");
  const formName = document.querySelector(".form-profile__input_info_name");
  const formCaption = document.querySelector(
    ".form-profile__input_info_caption"
  );

  const formCard = document.querySelector(".form-card");
  const formCardSaveButton = document.querySelector(".form-card__save-button");
  const formCardName = document.querySelector(".form-card__input_info_name");
  const formCardImage = document.querySelector(".form-card__input_info_image");

  const cardList = document.querySelector(".photo-grid__list");
  const cardTemplate = document.querySelector("#card");

  initialCards.forEach((card) =>
    cardList.appendChild(
      createCard(card, cardTemplate, popupImage, popupImageUrl, popupImageText)
    )
  );

  popupProfileCloseButton.addEventListener("click", () =>
    closePopup(popupProfile)
  );
  popupImageCloseButton.addEventListener("click", () => closePopup(popupImage));
  popupCardCloseButton.addEventListener("click", () => closePopup(popupCard));

  popupProfileOpenButton.addEventListener("click", () => {
    openPopup(popupProfile);
    formName.value = profileName.textContent;
    formCaption.value = profileCaption.textContent;
  });
  popupEditCardButton.addEventListener("click", () => openPopup(popupCard));

  profilePopupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addFormText();
    closePopup(popupProfile);
    e.target.reset();
  });

  formCard.addEventListener("submit", (e) => {
    e.preventDefault();
    const card = {
      name: formCardName.value,
      link: formCardImage.value,
    };
    cardList.insertBefore(
      createCard(card, cardTemplate, popupImage, popupImageUrl, popupImageText),
      cardList.firstChild
    );
    closePopup(popupCard);
      formCardSaveButton.disabled = true;
      formCardSaveButton.classList.add("form__save-button_disabled");
    e.target.reset();
  });

  enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
  });

  [popupCard, popupImage, popupProfile].forEach((popup) =>
    popup.addEventListener("click", (e) => closePopup(e.target))
  );

  function addFormText() {
    profileName.textContent = formName.value;
    profileCaption.textContent = formCaption.value;
  }
});
