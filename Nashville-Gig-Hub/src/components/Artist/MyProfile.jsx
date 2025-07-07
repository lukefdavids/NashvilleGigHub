import { useEffect, useState } from "react";
import "./MyProfile.css";
import { Link, useNavigate } from "react-router";
import { getUserById } from "../../services/userService";
import { extractSpotifyArtistId } from "../utilities/utilities";

export const MyProfile = ({ currentUser }) => {
  const [artist, setArtist] = useState({});
  const [spotifyArtistId, setSpotifyArtistId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getUserById(currentUser.id).then(setArtist);
  }, [currentUser]);

  useEffect(() => {
    if (artist?.spotify) {
      const id = extractSpotifyArtistId(artist.spotify);
      setSpotifyArtistId(id);
    }
  }, [artist?.spotify]);

  const handleEditClick = () => {
    navigate("/edit-profile");
  };
  return (
    <article id="artist-info-container">
      <h1>{artist?.name}</h1>

      <section id="artist-info">
        <section id="artist-row">
          <section id="artist-left">
            <img
              id="artist-info-image"
              src={artist?.image}
              alt={artist?.name}
            />
          </section>
          <section id="artist-right">
            <div id="spotify-player">
              {spotifyArtistId && (
                <iframe
                  style={{ borderRadius: "12px" }}
                  src={`https://open.spotify.com/embed/artist/${spotifyArtistId}?utm_source=generator`}
                  width="100%"
                  height="370"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              )}
            </div>
          </section>
        </section>
        <div id="artist-bio">
          <h2>About</h2>
          {artist?.bio}
        </div>
        <div id="artist-info-links">
          <Link target="_blank" to={`${artist?.instagram}`}>
            <img src="/img/Instagram_logo.png" alt="Instagram logo" />
          </Link>
          <Link target="_blank" to={`${artist?.spotify}`}>
            <img
              className="spotify-img"
              src="/img/Spotify_logo.png"
              alt="Spotify logo"
            />
          </Link>
          <Link target="_blank" to={`${artist?.facebook}`}>
            <img src="/img/Facebook_logo.png" alt="Facebook logo" />
          </Link>

          <Link target="_blank" to={`${artist?.website}`}>
            <img
              className="website-img"
              src="/img/website_logo.jpg"
              alt="Generic Website logo"
            />
          </Link>
        </div>
        <div id="btn-container">
          <button className="button-74" id="edit-btn" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      </section>
    </article>
  );
};
