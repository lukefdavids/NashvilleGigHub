export const getAllVenues = () => {
  return fetch("http://localhost:8088/venues").then((res) => res.json());
};
