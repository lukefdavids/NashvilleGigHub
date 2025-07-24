import { API_BASE_URL } from "./APIConfig.js";

export const getAllGenres = () => {
  return fetch(`${API_BASE_URL}/genres`).then((res) => res.json());
};
