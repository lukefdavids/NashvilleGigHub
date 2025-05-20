export const getAllArtists = () => {
  return fetch("http://localhost:8088/artists").then((res) => res.json());
};

export const getArtistById = (artistId) => {
  return fetch(`http://localhost:8088/artists/${artistId}`).then((res) =>
    res.json()
  );
};



export const updateProfile = (artistObj) => {
  return fetch(`http://localhost:8088/artists/${artistObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(artistObj),
  }).then((res) => res.json());
};
