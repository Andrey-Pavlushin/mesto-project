import { addCardLike, deleteCard, myId, removeCardLike } from "./api.js";
 import { addToPopupImage } from "./modal.js";

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
   const likeNumber = cloneCardTemplate.querySelector(
     ".photo-card__heart-number"
   );

   image.src = card.link;
   image.alt = card.name;
   label.textContent = card.name;
   likeNumber.textContent = card.likes.length;

   if (card.owner._id === myId)
     trashButton.addEventListener("click", (e) => {
       deleteCard(card._id)
         .then(() => {
           {
            e.target.closest(".photo-card").remove();
          }
         })
         .catch((err) => console.log(err));
     });
   else {
     trashButton.style.display = "none";
   }
   image.addEventListener("click", (e) =>
     addToPopupImage(e, popupImage, popupImageUrl, popupImageText)
   );

   if (hasMyLike(card))
     likeButton.classList.add("photo-card__heart-button_active");

   likeButton.addEventListener("click", (e) =>
     toggleLikeButton(e.target, card._id, likeNumber)
   );

   return cloneCardTemplate;
 }

 function toggleLikeButton(likeButton, cardId, likeNumber) {
   if (likeButton.classList.contains("photo-card__heart-button_active")) {
    removeCardLike(cardId)
    .then((result) => {
      removeActiveHeart(likeButton);
      likeNumber.textContent = result.likes.length;
    })
    .catch((err) => console.log(err));
} else {
  addCardLike(cardId)
    .then((result) => {
      addActiveHeart(likeButton);
      likeNumber.textContent = result.likes.length;
    })
    .catch((err) => console.log(err));
   }
 }

 function hasMyLike(card) {
   return card.likes.some((owner) => owner._id === myId);
 }

 function addActiveHeart(likeButton) {
   likeButton.classList.add("photo-card__heart-button_active");
 }

 function removeActiveHeart(likeButton) {
   likeButton.classList.remove("photo-card__heart-button_active");
 }