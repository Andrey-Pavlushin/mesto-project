export const myId = "a49b225c9ff9fb5cb60da697";
 const config = {
   baseUrl: "https://nomoreparties.co/v1/plus-cohort-28",
   headers: {
     authorization: "da67faeb-c3b2-41d3-a184-b77566b0c3bf",
     "Content-Type": "application/json",
   },
 };

 // --- cards ---

 export const getInitialCards = () => {
   return fetch(`${config.baseUrl}/cards`, {
     headers: config.headers,
   }).then((res) => {
     if (res.ok) {
       return res.json();
     }

     return Promise.reject(`Ошибка: ${res.status}`);
   });
 };

 export const addNewCard = (cardName, cardLink) => {
   return fetch(`${config.baseUrl}/cards`, {
     method: "POST",
     headers: config.headers,
     body: JSON.stringify({
       name: cardName,
       link: cardLink,
     }),
   }).then((res) => {
     if (res.ok) {
       return res.json();
     }
     return Promise.reject(`Ошибка: ${res.status}`);
   });
 };

 export const deleteCard = (cardId) => {
   return fetch(`${config.baseUrl}/cards/${cardId}`, {
     method: "DELETE",
     headers: config.headers,
   }).then((res) => {
     if (res.ok) {
       return res.json();
     }
     return Promise.reject(`Ошибка: ${res.status}`);
   });
 };

 export const addCardLike = (cardId) => {
   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
     method: "PUT",
     headers: config.headers,
   }).then((res) => {
     if (res.ok) {
       return res.json();
     }

     return Promise.reject(`Ошибка: ${res.status}`);
   });
 };

 export const removeCardLike = (cardId) => {
   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
     method: "DELETE",
     headers: config.headers,
   }).then((res) => {
     if (res.ok) {
       return res.json();
     }

     return Promise.reject(`Ошибка: ${res.status}`);
   });
 };

 // --- user ---

 export const getUserInfo = () => {
   return fetch(`${config.baseUrl}/users/me`, {
     headers: config.headers,
   }).then((res) => {
     if (res.ok) {
       return res.json();
     }
     return Promise.reject(`Ошибка: ${res.status}`);
   });
 };

 export const updateUserInfo = (profileName, profileCaption) => {
   return fetch(`${config.baseUrl}/users/me`, {
     method: "PATCH",
     headers: config.headers,
     body: JSON.stringify({
       name: profileName,
       about: profileCaption,
     }),
   }).then((res) => {
     if (res.ok) {
       return res.json();
     }
     return Promise.reject(`Ошибка: ${res.status}`);
   });
 };

 export const updateUserAvatar = (avatarLink) => {
   return fetch(`${config.baseUrl}/users/me/avatar`, {
     method: "PATCH",
     headers: config.headers,
     body: JSON.stringify({
       avatar: avatarLink,
     }),
   }).then((res) => {
     if (res.ok) {
       return res.json();
     }
     return Promise.reject(`Ошибка: ${res.status}`);
   });
 };