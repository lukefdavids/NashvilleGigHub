import { useEffect, useState } from "react";
import { getAllArtists } from "../../services/artistService";
import "./Artists.css";
import { Link } from "react-router";

export const Artists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    getAllArtists().then(setArtists);
  }, []);

  return (
    <article id="artists-container">
      <h1 id="artists-title">Artists</h1>
      <section id="all-artists">
        {artists.map((artist) => {
          return (
            <Link to={`/artists/${artist.id}`} key={artist.id}>
              <section className="artist">
                <h3>{artist.name}</h3>
                <img
                  className="artist-page-img"
                  src={artist.image}
                  alt={artist.name}
                />
              </section>
            </Link>
          );
        })}
      </section>
    </article>
  );
};
