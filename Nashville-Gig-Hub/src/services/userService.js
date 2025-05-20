export const getUserByName = (name) => {
  return fetch(`http://localhost:8088/artists?name=${name}`).then((res) =>
    res.json()
  );
};

export const createUser = (user) => {
  return fetch("http://localhost:8088/artists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const getUserById = (currentUserId) => {
  return fetch(`http://localhost:8088/artists/${currentUserId}`).then((res) =>
    res.json()
  );
};
