export const getAllGigs = () => {
  return fetch("http://localhost:8088/gigs?_expand=artist").then((res) =>
    res.json()
  );
};

export const getGigsByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/gigs?artistId=${userId}&_expand=artist`
  ).then((res) => res.json());
};

export const postNewGig = (gigObj) => {
  return fetch("http://localhost:8088/gigs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gigObj),
  }).then((res) => res.json());
};

export const deleteGig = (gigId) => {
  return fetch(`http://localhost:8088/gigs/${gigId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
