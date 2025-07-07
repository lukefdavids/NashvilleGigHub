import { API_BASE_URL } from "./APIConfig.js";

export const getAllVenues = () => {
  return fetch(`${API_BASE_URL}/venues`).then((res) => res.json());
};
