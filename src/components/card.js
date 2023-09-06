import { addToPopupImage } from "./modal.js";

export const initialCards = [
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

export function createCard(
  card,
  cardTemplate,
  popupImage,
  popupImageUrl,
  popupImageText
) {
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

  trashButton.addEventListener("click", (e) => {
    e.target.closest(".photo-card").remove();
  });
  image.addEventListener("click", (e) =>
    addToPopupImage(e, popupImage, popupImageUrl, popupImageText)
  );
  likeButton.addEventListener("click", toggleLikeButton);

  return cloneCardTemplate;
}

function toggleLikeButton(e) {
  e.target.classList.toggle("photo-card__heart-button_active");
}
