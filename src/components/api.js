import { checkResponse } from "./utils.js";

 export const myId = "a49b225c9ff9fb5cb60da697";
 const config = {
   baseUrl: "https://nomoreparties.co/v1/plus-cohort-28",
  headers: {
    authorization: "da67faeb-c3b2-41d3-a184-b77566b0c3bf",
    "Content-Type": "application/json",
   },
 };

 export function request(url, options) {
   return fetch(url, options).then(checkResponse);
 }

 // --- cards ---

 export function getInitialCards() {
   return request(`${config.baseUrl}/cards`, {
     headers: config.headers,
   });
 }
 export function addNewCard(cardName, cardLink) {
   return request(`${config.baseUrl}/cards`, {
     method: "POST",
     headers: config.headers,
     body: JSON.stringify({
       name: cardName,
       link: cardLink,
     }),
   });
 }

 export function deleteCard(cardId) {
   return request(`${config.baseUrl}/cards/${cardId}`, {
     method: "DELETE",
     headers: config.headers,
   });
 }

 export function addCardLike(cardId) {
   return request(`${config.baseUrl}/cards/likes/${cardId}`, {
     method: "PUT",
     headers: config.headers,
   });
 }
 export function removeCardLike(cardId) {
   return request(`${config.baseUrl}/cards/likes/${cardId}`, {
     method: "DELETE",
     headers: config.headers,
   });
 }

 // --- user ---
 export function getUserInfo() {
   return request(`${config.baseUrl}/users/me`, {
     headers: config.headers,
   });
 }

 export function updateUserInfo(profileName, profileCaption) {
   return request(`${config.baseUrl}/users/me`, {
     method: "PATCH",
     headers: config.headers,
     body: JSON.stringify({
       name: profileName,
       about: profileCaption,
     }),
   });
 }
 export function updateUserAvatar(avatarLink) {
   return request(`${config.baseUrl}/users/me/avatar`, {
     method: "PATCH",
     headers: config.headers,
     body: JSON.stringify({
       avatar: avatarLink,
     }),
   });
 }