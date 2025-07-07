import { API_BASE_URL } from "./apiConfig.js";

export const getAllArtists = () => {
  return fetch(`${API_BASE_URL}/artists`).then((res) => res.json());
};

export const getArtistById = (artistId) => {
  return fetch(`${API_BASE_URL}/artists/${artistId}`).then((res) => res.json());
};

export const updateProfile = (artistObj) => {
  return fetch(`${API_BASE_URL}/artists/${artistObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(artistObj),
  }).then((res) => res.json());
};
