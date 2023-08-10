const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  
  
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
    const popupProfileOpenButton = document.querySelector(".profile__edit-button");
    const popupEditCardButton = document.querySelector(".profile__add-button");
  
    const profilePopupForm = document.querySelector(".form");
    const formName = document.querySelector(".form__input_info_name");
    const formCaption = document.querySelector(".form__input_info_caption");
  
    const formCard = document.querySelector(".form-card");
    const formCardName = document.querySelector(".form-card__input_info_name");
    const formCardImage = document.querySelector(".form-card__input_info_image");
  
    const cardList = document.querySelector(".photo-grid__list");
    const cardTemplate = document.querySelector("#card");
  
    initialCards.forEach((card) => cardList.appendChild(createCard(card)));
  
    popupProfileCloseButton.addEventListener("click", () => closePopup(popupProfile));
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
      cardList.insertBefore(createCard(card), cardList.firstChild);
      closePopup(popupCard);
      e.target.reset();
    });
  
    function createCard(card) {
      const cloneCardTemplate = cardTemplate.content.cloneNode(true);
      const image = cloneCardTemplate.querySelector(".photo-card__image");
      const label = cloneCardTemplate.querySelector(".photo-card__header");
      const trashButton = cloneCardTemplate.querySelector(".photo-card__trash");
      const likeButton = cloneCardTemplate.querySelector(
        ".photo-card__heart-button"
      );
  
      image.src = card.link;
      image.alt = card.name;
      label.textContent = card.name;
  
      trashButton.addEventListener("click", (e) => e.target.parentNode.remove());
      image.addEventListener("click", addToPopupImage);
      likeButton.addEventListener("click", toggleLikeButton);
  
      return cloneCardTemplate;
    }
  
    function addFormText() {
      profileName.textContent = formName.value;
      profileCaption.textContent = formCaption.value;
    }
  
    function closePopup(popup) {
      popup.classList.remove("popup_opened");
    }
  
    function openPopup(popup) {
      popup.classList.add("popup_opened");
    }
  
    function addToPopupImage(e) {
      openPopup(popupImage);
      popupImageUrl.src = e.target.src;
      popupImageUrl.alt = e.target.alt;
      popupImageText.textContent = e.target.parentNode.querySelector(
        ".photo-card__header"
      ).textContent;
    }
  
    function toggleLikeButton(e) {
      const classes = e.target.classList;
      if (classes.contains("photo-card__heart-button_active")) {
        classes.remove("photo-card__heart-button_active");
      } else {
        classes.add("photo-card__heart-button_active");
      }
    }
  });
  