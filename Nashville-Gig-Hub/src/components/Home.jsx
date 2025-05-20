import { useState, useEffect } from "react";
import { getAllGigs } from "../services/gigService";
import { getAllVenues } from "../services/venueService";
import "./Home.css";
import { formatDateTime } from "./utilities/utilities";
import { Link } from "react-router";
import { getAllGenres } from "../services/genreService";

export const Home = () => {
  const [gigs, setGigs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [gigWithDetails, setGigWithDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllGigs().then(setGigs);
    getAllVenues().then(setVenues);
    getAllGenres().then(setGenres);
  }, []);

  useEffect(() => {
    if (gigs.length && venues.length && genres.length) {
      const enrichedGigs = gigs.map((gig) => {
        const foundVenue = venues.find((venue) => venue.id === gig.venueId);
        const foundGenre = genres.find(
          (genre) => genre.id === gig.artist?.genreId
        );

        return {
          ...gig,
          ...foundVenue,
          genre: foundGenre.name,
        };
      });

      setGigWithDetails(enrichedGigs);
    }
  }, [gigs, venues, genres]);

  useEffect(() => {
    let gigsToFilter = [...gigWithDetails];

    if (searchTerm) {
      gigsToFilter = gigsToFilter.filter(
        (gig) =>
          gig.artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gig.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre?.id && selectedGenre.id !== 0) {
      gigsToFilter = gigsToFilter.filter(
        (gig) => gig.artist.genreId === selectedGenre.id
      );
    }

    gigsToFilter = gigsToFilter.toSorted(
      (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
    );

    setFilteredGigs(gigsToFilter);
  }, [searchTerm, selectedGenre, gigWithDetails]);

  const handleGenreChange = (e) => {
    const selected = genres.find(
      (genre) => genre.id === parseInt(e.target.value)
    );
    setSelectedGenre(selected || {});
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div id="home-container">
      <h1>Nashville Gig Hub</h1>
      <div id="filters">
        <select id="filter-bar" name="genres" onChange={handleGenreChange}>
          <option value="0">All genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <input
          id="search-bar"
          type="search"
          onChange={handleSearch}
          placeholder="Search by artist or venue"
        />
      </div>
      <div id="all-gigs-container">
        {filteredGigs.map((gig) => {
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
                  <p>
                    <span>Genre: </span> {gig.genre}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
        {gigWithDetails.length > 0 && filteredGigs.length === 0 && (
          <article id="no-gigs">
            <div id="no-upcoming-gigs">
              <h2>No upcoming {selectedGenre?.name} gigs</h2>{" "}
            </div>
            <div id="tell-your-friends">
              <h3>
                Know any great {selectedGenre?.name} artists in Nashville? Tell
                them about Nashville Gig Hub!
              </h3>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};
