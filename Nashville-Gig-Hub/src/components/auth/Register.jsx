import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByName } from "../../services/userService";
import { getAllGenres } from "../../services/genreService";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    bio: "",
    image: "",
    facebook: "",
    instagram: "",
    spotify: "",
    website: "",
    genreId: 0,
  });

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getAllGenres().then(setGenres);
  }, []);

  let navigate = useNavigate();

  const registerNewUser = () => {
    const newUser = {
      ...user,
    };

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "gighub_user",
          JSON.stringify({
            id: createdUser.id,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByName(user.name).then((response) => {
      if (response.length > 0) {
        window.alert("Account with that name already exists");
      } else {
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Nashville Gig Hub</h1>
        <h2>Artist register</h2>
        {/* <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              className="auth-form-input"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset> */}
        <section className="edit-row">
          <div className="column">
            <h3>Genre:</h3>
          </div>
          <div className="column">
            <select id="genre" name="genreId" required onChange={updateUser}>
              <option disabled value="">
                Select Venue:
              </option>
              {genres.map((genre) => {
                return (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div>
        </section>
        <section className="edit-row">
          <div className="column">
            <h3>Name:</h3>
          </div>
          <div className="column">
            <input
              onChange={updateUser}
              required
              type="text"
              id="name"
              name="name"
            />
          </div>
        </section>
        <section className="edit-row">
          <div className="column">
            <h3>Bio:</h3>
          </div>
          <div className="column">
            <textarea
              id="bio-input"
              onChange={updateUser}
              name="bio"
              required
            />
          </div>
        </section>
        <section className="edit-row">
          <div className="column">
            <h3>Image link:</h3>
          </div>
          <div className="column">
            <input name="image" required onChange={updateUser} />
          </div>
        </section>
        <section className="edit-row">
          <div className="column">
            <h3>Facebook:</h3>
          </div>
          <div className="column">
            <input name="facebook" required onChange={updateUser} />
          </div>
        </section>
        <section className="edit-row">
          <div className="column">
            <h3>Instagram:</h3>
          </div>
          <div className="column">
            <input
              name="instagram"
              required
              value={updateUser.instagram}
              onChange={updateUser}
            />
          </div>
        </section>
        <section className="edit-row">
          <div className="column">
            <h3>Spotify:</h3>
          </div>
          <div className="column">
            <input name="spotify" required onChange={updateUser} />
          </div>
        </section>
        <section className="edit-row">
          <div className="column">
            <h3>Website:</h3>
          </div>
          <div className="column">
            <input name="website" required onChange={updateUser} />
          </div>
        </section>
        <fieldset className="auth-fieldset">
          <div>
            <button className="button-74" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
