import { createCard } from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import {
  addNewCard,
  getInitialCards,
  getUserInfo,
  updateUserAvatar,
  updateUserInfo,
} from "./components/api.js";
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
  const popupCardSaveButton = document.querySelector(".form-card__save-button");

   const popupEditAvatarButton = document.querySelector(".profile__avatar");
   const popupAvatar = document.querySelector(".popup-avatar");
   const popupAvatarCloseButton = document.querySelector(
     ".popup-avatar__close-button"
   );
   const popupAvatarSaveButton = document.querySelector(
     ".form-avatar__save-button"
   );

  const profileName = document.querySelector(".profile__name");
  const profileCaption = document.querySelector(".profile__caption");
  const profileAvatarImage = document.querySelector(".profile__avatar-image");
  const popupProfileOpenButton = document.querySelector(
    ".profile__edit-button"
  );
  const popupEditCardButton = document.querySelector(".profile__add-button");

  const profilePopupForm = document.querySelector(".form-profile");
  const formName = document.querySelector(".form-profile__input_info_name");
  const formCaption = document.querySelector(
    ".form-profile__input_info_caption"
  );
  const profileSaveButton = document.querySelector(
    ".form-profile__save-button"
  );

  const formAvatar = document.querySelector(".form-avatar");
  const formAvatarLink = document.querySelector(".form-avatar__input");
  const formAvatarSaveButton = document.querySelector(".form-avatar__save-button");

  const formCard = document.querySelector(".form-card");
  const formCardSaveButton = document.querySelector(".form-card__save-button");
  const formCardName = document.querySelector(".form-card__input_info_name");
  const formCardImage = document.querySelector(".form-card__input_info_image");

  const cardList = document.querySelector(".photo-grid__list");
  const cardTemplate = document.querySelector("#card");

  getInitialCards()
     .then((result) =>
       result.forEach((card) =>
         cardList.appendChild(
           createCard(
             card,
             cardTemplate,
             popupImage,
             popupImageUrl,
             popupImageText
           )
         )
       )
     )
     .catch((err) => console.log(err));

   getUserInfo()
     .then((result) => {
       addFormText(result.name, result.about);
       profileAvatarImage.src = result.avatar;
     })
     .catch((err) => console.log(err));

  popupProfileCloseButton.addEventListener("click", () =>
    closePopup(popupProfile)
  );
  popupImageCloseButton.addEventListener("click", () => closePopup(popupImage));
  popupCardCloseButton.addEventListener("click", () => closePopup(popupCard));
  popupAvatarCloseButton.addEventListener("click", () =>
  closePopup(popupAvatar)
);

  popupProfileOpenButton.addEventListener("click", () => {
    openPopup(popupProfile);
    formName.value = profileName.textContent;
    formCaption.value = profileCaption.textContent;
  });
  popupEditCardButton.addEventListener("click", () => openPopup(popupCard));
  popupEditAvatarButton.addEventListener("click", () => openPopup(popupAvatar));

  profilePopupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profileSaveButton.textContent = "Сохранение...";
    updateUserInfo(formName.value, formCaption.value)
      .then((result) => {
        addFormText(result.name, result.about);
        closePopup(popupProfile);
        profileSaveButton.textContent = "Сохранить";
      })
      .catch((err) => console.log(err));
    e.target.reset();
  });

  formCard.addEventListener("submit", (e) => {
    e.preventDefault();
    popupCardSaveButton.textContent = "Сохранение...";
    addNewCard(formCardName.value, formCardImage.value)
      .then((result) => {
        cardList.insertBefore(
          createCard(
            result,
            cardTemplate,
            popupImage,
            popupImageUrl,
            popupImageText
          ),
          cardList.firstChild
        );
        popupCardSaveButton.textContent = "Сохранить";
        closePopup(popupCard);
      })
      .catch((err) => console.log(err));
    formCardSaveButton.disabled = true;
    formCardSaveButton.classList.add("form__save-button_disabled");
    e.target.reset();
  });

  formAvatar.addEventListener("submit", (e) => {
    e.preventDefault();
    popupAvatarSaveButton.textContent = "Сохранение...";
    updateUserAvatar(formAvatarLink.value)
      .then((result) => {
        profileAvatarImage.src = result.avatar;
        popupAvatarSaveButton.textContent = "Сохранить";
        closePopup(popupAvatar);
      })
      .catch((err) => console.log(err));
    formAvatarSaveButton.disabled = true;
    formAvatarSaveButton.classList.add("form__save-button_disabled");

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

[popupCard, popupImage, popupProfile, popupAvatar].forEach((popup) =>
   popup.addEventListener("click", (e) => {
     if (e.target === e.currentTarget) closePopup(e.target);
   })
 );

 function addFormText(nameValue, captionValue) {
   profileName.textContent = nameValue;
   profileCaption.textContent = captionValue;
 }
});
