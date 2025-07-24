import { API_BASE_URL } from "./APIConfig.js";

export const getAllGigs = () => {
  return fetch(`${API_BASE_URL}/gigs?_expand=artist`).then((res) => res.json());
};

export const getGigByArtistId = (artistId) => {
  return fetch(`${API_BASE_URL}/gigs?artistId=${artistId}&_expand=artist`).then(
    (res) => res.json()
  );
};

export const getGigsByUserId = (userId) => {
  return fetch(`${API_BASE_URL}/gigs?artistId=${userId}&_expand=artist`).then(
    (res) => res.json()
  );
};

export const postNewGig = (gigObj) => {
  return fetch(`${API_BASE_URL}/gigs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gigObj),
  }).then((res) => res.json());
};

export const deleteGig = (gigId) => {
  return fetch(`${API_BASE_URL}/gigs/${gigId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const updateGig = (gigObj) => {
  return fetch(`${API_BASE_URL}/gigs/${gigObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gigObj),
  }).then((res) => res.json());
};

export const getGigById = (gigId) => {
  return fetch(`${API_BASE_URL}/gigs/${gigId}`).then((res) => res.json());
};
