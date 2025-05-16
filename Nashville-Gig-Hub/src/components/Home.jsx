import { useState, useEffect } from "react";
import { getAllGigs } from "../services/gigService";
import { getAllVenues } from "../services/venueService";
import "./Home.css";
import { formatDateTime } from "./utilities/utilities";
import { Link } from "react-router";

export const Home = () => {
  const [gigs, setGigs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [gigWithVenue, setGigWithVenue] = useState([]);

  useEffect(() => {
    getAllGigs().then(setGigs);
    getAllVenues().then(setVenues);
  }, []);

  useEffect(() => {
    if (gigs && venues) {
      const gigsPlusVenue = gigs.map((gig) => {
        const foundVenue = venues.find((venue) => venue.id === gig.venueId);
        return {
          ...gig,
          ...foundVenue,
        };
      });

      setGigWithVenue(gigsPlusVenue);
    }
  }, [gigs, venues]);

  return (
    <div id="home-container">
      <h1>Nashville Gig Hub</h1>
      <div id="filters">
        <select name="genres" />
        <input type="text" placeholder="Search by artist or venue" />
      </div>
      <div id="all-gigs-container">
        {gigWithVenue.map((gig) => {
          return (
            <article className="gig" key={gig.id}>
              <div className="gig-left">
                <div>
                  <h3>{gig.artist?.name}</h3>
                </div>
                <div>
                  <img
                    className="artist-img"
                    src={gig.artist.image}
                    alt={gig.artist.name}
                  />
                </div>
                <div className="links">
                  <Link target="_blank" to={`${gig.artist.instagram}`}>
                    <img src="/img/Instagram_logo.png" alt="Instagram logo" />
                  </Link>
                  <Link target="_blank" to={`${gig.artist.spotify}`}>
                    <img
                      className="spotify-img"
                      src="/img/Spotify_logo.png"
                      alt="Spotify logo"
                    />
                  </Link>
                  <Link target="_blank" to={`${gig.artist.facebook}`}>
                    <img src="/img/Facebook_logo.png" alt="Facebook logo" />
                  </Link>

                  <Link target="_blank" to={`${gig.artist.website}`}>
                    <img
                      className="website-img"
                      src="/img/website_logo.jpg"
                      alt="Generic Website logo"
                    />
                  </Link>
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
        })}
      </div>
    </div>
  );
};
