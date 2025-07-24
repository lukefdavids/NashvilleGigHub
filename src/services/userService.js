import { API_BASE_URL } from "./APIConfig.js";

export const getUserByName = (name) => {
  return fetch(`${API_BASE_URL}/artists?name=${name}`).then((res) =>
    res.json()
  );
};

export const createUser = (user) => {
  return fetch(`${API_BASE_URL}/artists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const getUserById = (currentUserId) => {
  return fetch(`${API_BASE_URL}/artists/${currentUserId}`).then((res) =>
    res.json()
  );
};
