import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getArtistById } from "../../services/artistService";
import "./ArtistInfo.css";
import { Link } from "react-router";
import { extractSpotifyArtistId, formatDateTime } from "../utilities/utilities";
import { getGigByArtistId } from "../../services/gigService";
import { getAllVenues } from "../../services/venueService";

export const ArtistInfo = ({ currentUser }) => {
  const [artist, setArtist] = useState({});
  const [venues, setVenues] = useState([]);
  const [spotifyArtistId, setSpotifyArtistId] = useState(null);
  const [artistGigs, setArtistGigs] = useState([]);
  const [gigWithDetails, setGigWithDetails] = useState([]);
  const today = new Date();
  const { artistId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getArtistById(artistId).then(setArtist);
    getGigByArtistId(artistId).then(setArtistGigs);
    getAllVenues().then(setVenues);
  }, [artistId]);

  useEffect(() => {
    if (artistGigs.length && venues.length) {
      const sortedByDate = artistGigs.toSorted(
        (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
      );
      const enrichedGigs = sortedByDate.map((gig) => {
        const foundVenue = venues.find((venue) => venue.id === gig.venueId);

        return {
          ...gig,
          ...foundVenue,
        };
      });

      setGigWithDetails(enrichedGigs);
    }
  }, [artistGigs, venues]);

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
    <>
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
          {currentUser?.id === artist.id && (
            <div id="btn-container">
              <button
                className="button-74"
                id="edit-btn"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            </div>
          )}
        </section>
      </article>

      {/* //Upcoming Gigs */}

      <h1 id="upcoming-gigs">Upcoming Gigs</h1>

      <div id="upcoming-gigs-container">
        {gigWithDetails.length > 0 ? (
          gigWithDetails.map((gig) => {
            if (new Date(gig.dateTime) > today) {
              return (
                <article className="gig" key={gig.id}>
                  <div className="gig-left">
                    <div>
                      <img
                        className="artist-info-gig-img"
                        src={gig.artist.image}
                        alt={gig.artist.name}
                      />
                    </div>
                  </div>
                  <div className="gig-right">
                    <div className="date">
                      {formatDateTime(gig.dateTime).formattedDate} @ {gig.name}
                    </div>
                    <div className="gig-info">
                      <p>
                        <span>Where: </span>
                        <Link
                          to={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                            gig.address
                          )}`}
                          target="_blank"
                        >
                          {gig.address}
                        </Link>
                      </p>
                      <p>
                        <span>When: </span>
                        {formatDateTime(gig.dateTime).formattedTime}
                      </p>
                      <p>
                        <span>How much: </span>{" "}
                        {gig.cost === 0 ? "Free" : `$${gig.cost}`}
                      </p>
                      <p>
                        <span>Ages: </span> {gig.ages}
                      </p>
                    </div>
                  </div>
                </article>
              );
            }
          })
        ) : (
          <h2>No upcoming gigs for this artist</h2>
        )}
      </div>
    </>
  );
};
