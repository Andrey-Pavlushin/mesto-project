export function addToPopupImage(e, popupImage, popupImageUrl, popupImageText) {
  openPopup(popupImage);
  popupImageUrl.src = e.target.src;
  popupImageUrl.alt = e.target.alt;
  popupImageText.textContent = e.target.parentNode.querySelector(
    ".photo-card__header"
  ).textContent;
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEsc);
}

function handleEsc(e) {
  if (e.key == "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEsc);
}
