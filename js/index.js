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

    const popupImage = document.querySelector('.popup-image');
    const closePopupImageButton = document.querySelector('.popup-image__close-button');

    const popup = document.querySelector('.popup');
    const closePopupButton = document.querySelector('.popup__close-button');

    const popupCard = document.querySelector('.popup-card');
    const closePopupCardButton = document.querySelector('.popup-card__close-button');
    
    const profileName = document.querySelector('.profile__name');
    const profileCaption = document.querySelector('.profile__caption');
    const editButton = document.querySelector('.profile__edit-button');
    const editCardButton = document.querySelector('.profile__add-button');

    const form = document.querySelector('.form');
    const formName = document.querySelector('.form__input_info_name');
    const formCaption = document.querySelector('.form__input_info_caption');
    
    const formCard = document.querySelector('.form-card');
    const formCardName = document.querySelector('.form-card__input_info_name');
    const formCardImage = document.querySelector('.form-card__input_info_image');

    const cardList = document.querySelector('.photo-grid__list');

    initialCards.forEach(
        (card) =>
          (cardList.innerHTML += `
            <li class="photo-card">
                <button class="photo-card__trash"></button>
                <img src=${card.link} alt=${card.name} class="photo-card__image">
                <div class="photo-card__header-place">
                  <h2 class="photo-card__header">${card.name}</h2>
                  <button type="button" aria-label="Лайкнуть" class="photo-card__heart-button"></button>
                </div>
            </li>
        `)
    );

    const cardTrashes = document.querySelectorAll('.photo-card__trash');
    const cardImages = document.querySelectorAll('.photo-card__image');
    const likeButtons = document.querySelectorAll('.photo-card__heart-button');
  
    cardTrashes.forEach((trash) =>
        trash.addEventListener("click", (e) => e.target.parentNode.remove())
    );
    cardImages.forEach((image) =>
        image.addEventListener("click", addToPopupImage)
    );
    likeButtons.forEach((button) => {
        button.addEventListener("click", toggleLikeButton);
    });

    closePopupButton.addEventListener("click", closePopup);
    closePopupImageButton.addEventListener("click", closePopupImage);
    closePopupCardButton.addEventListener("click", closePopupCard);
    
    editButton.addEventListener("click", () =>
        popup.classList.add('popup_opened')
    );

    editCardButton.addEventListener("click", () =>
        popupCard.classList.add('popup-card_opened')
    );

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addFormText();
        closePopup();
    });

    formName.value = profileName.textContent;
    formCaption.value = profileCaption.textContent;

    formCard.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const card = document.createElement("li");
        card.className = 'photo-card';
    
        const buttonTrash = document.createElement("button");
        buttonTrash.className = 'photo-card__trash';
        buttonTrash.addEventListener("click", (e) => e.target.parentNode.remove());
    
        const image = document.createElement("img");
        image.className = "photo-card__image";
        image.setAttribute("src", formCardImage.value);
    
        image.addEventListener("click", addToPopupImage);
    
        const box = document.createElement("div");
        box.className = "photo-card__header-place";
    
        const title = document.createElement("h2");
        title.className = "photo-card__header";
        title.textContent = formCardName.value;
    
        const buttonLike = document.createElement("button");
        buttonLike.className = 'photo-card__heart-button';
        buttonLike.setAttribute("type", "button");
        buttonLike.setAttribute("aria-label", "Лайкнуть");
        buttonLike.addEventListener("click", toggleLikeButton);
    
        box.appendChild(title);
        box.appendChild(buttonLike);
        card.appendChild(buttonTrash);
        card.appendChild(image);
        card.appendChild(box);
        cardList.insertBefore(card, cardList.firstChild);
    
        closePopupCard();
    });

    function addFormText() {
        profileName.textContent = formName.value;
        profileCaption.textContent = formCaption.value;
    }
    
    function closePopup() {
        popup.classList.remove('popup_opened');
    }
    
    function closePopupCard() {
        popupCard.classList.remove('popup-card_opened');
    }
    
    function closePopupImage() {
        popupImage.classList.remove('popup-image_opened');
    }
    
    function addToPopupImage(e) {
        popupImage.classList.add('popup-image_opened');
        popupImage.children[0].children[1].src = e.target.src;
        popupImage.children[0].children[2].textContent =
          e.target.nextElementSibling.firstElementChild.textContent;
    }
    
    function toggleLikeButton(e) {
        const classes = e.target.classList;
        if (classes.contains('photo-card__heart-button_active')) {
          classes.remove('photo-card__heart-button_active');
        } else {
          classes.add('photo-card__heart-button_active');
        }
    }
});