import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";
import { updateProfile } from "../../services/artistService";
import { getAllGenres } from "../../services/genreService";
import "./EditProfile.css";
import { useNavigate } from "react-router";

export const EditProfile = ({ currentUser }) => {
  const [genres, setGenres] = useState([]);
  const [updatedProfile, setUpdatedProfile] = useState({
    id: null,
    name: "",
    bio: "",
    image: "",
    facebook: "",
    instagram: "",
    spotify: "",
    website: "",
    genreId: 0,
  });

  const navigate = useNavigate();
  useEffect(() => {
    getUserById(currentUser.id).then((res) => {
      setUpdatedProfile({
        id: currentUser.id,
        name: res.name || "",
        bio: res.bio || "",
        image: res.image || "",
        facebook: res.facebook || "",
        instagram: res.instagram || "",
        spotify: res.spotify || "",
        website: res.website || "",
        genreId: res.genreId || 0,
      });
    });

    getAllGenres().then(setGenres);
  }, [currentUser]);

  const handleProfileEdit = (e) => {
    const { name, value } = e.target;

    setUpdatedProfile({
      ...updatedProfile,
      [name]: name.includes("Id") ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !updatedProfile.name ||
      !updatedProfile.bio ||
      !updatedProfile.image ||
      !updatedProfile.facebook ||
      !updatedProfile.instagram ||
      !updatedProfile.spotify ||
      !updatedProfile.website ||
      !updatedProfile.genreId
    ) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    updateProfile(updatedProfile).then(() => {
      navigate("/my-profile");
    });
  };

  return (
    <form id="create-gig">
      <h2 id="edit-title">Edit Profile</h2>
      <section className="edit-row">
        <div className="column">
          <h3>Genre:</h3>
        </div>
        <div className="column">
          <select
            id="genre"
            name="genreId"
            value={updatedProfile.genreId}
            required
            onChange={handleProfileEdit}
          >
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
            onChange={handleProfileEdit}
            required
            value={updatedProfile.name}
            type="text"
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
            onChange={handleProfileEdit}
            value={updatedProfile.bio}
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
          <input
            name="image"
            required
            value={updatedProfile.image}
            onChange={handleProfileEdit}
          />
        </div>
      </section>
      <section className="edit-row">
        <div className="column">
          <h3>Facebook:</h3>
        </div>
        <div className="column">
          <input
            name="facebook"
            required
            value={updatedProfile.facebook}
            onChange={handleProfileEdit}
          />
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
            value={updatedProfile.instagram}
            onChange={handleProfileEdit}
          />
        </div>
      </section>
      <section className="edit-row">
        <div className="column">
          <h3>Spotify:</h3>
        </div>
        <div className="column">
          <input
            name="spotify"
            required
            value={updatedProfile.spotify}
            onChange={handleProfileEdit}
          />
        </div>
      </section>
      <section className="edit-row">
        <div className="column">
          <h3>Website:</h3>
        </div>
        <div className="column">
          <input
            name="website"
            required
            value={updatedProfile.website}
            onChange={handleProfileEdit}
          />
        </div>
      </section>
      <section className="edit-row">
        <button className="button-74" id="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </section>
    </form>
  );
};
