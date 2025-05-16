export const getAllArtists = () => {
  return fetch("http://localhost:8088/artists").then((res) => res.json());
};

export const getArtistById = (artistId) => {
  return fetch(`http://localhost:8088/artists/${artistId}`).then((res) =>
    res.json()
  );
};
