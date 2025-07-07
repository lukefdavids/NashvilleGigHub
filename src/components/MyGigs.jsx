import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
// import { getUserById } from "../services/userService";
import { deleteGig, getGigsByUserId } from "../services/gigService";
import { formatDateTime } from "./utilities/utilities";
import { getAllVenues } from "../services/venueService";
import "./MyGigs.css";
import { Link } from "react-router";

export const MyGigs = () => {
  //   const [user, setUser] = useState({});
  const [gigs, setGigs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [gigsWithVenue, setGigsWithVenue] = useState([]);
  const { currentUser } = useParams();

  const navigate = useNavigate();
  const today = new Date();
  useEffect(() => {
    getGigsByUserId(currentUser).then(setGigs);
    getAllVenues().then(setVenues);
  }, [currentUser]);

  useEffect(() => {
    if (gigs && venues) {
      const sortedByDate = gigs.toSorted(
        (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
      );
      const gigsPlusVenue = sortedByDate.map((gig) => {
        const foundVenue = venues.find((venue) => venue.id === gig.venueId);
        return {
          ...gig,
          venueName: foundVenue?.name,
          venueAddress: foundVenue?.address,
          venueWebsite: foundVenue?.website,
        };
      });

      setGigsWithVenue(gigsPlusVenue);
    }
  }, [gigs, venues]);

  const handleCreate = (e) => {
    e.preventDefault();
    navigate("/create-gig");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const gigId = parseInt(e.target.value);
    navigate(`/edit-gig/${gigId}`);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const gigId = parseInt(e.target.value);

    if (
      confirm("Are you sure you want to delete this gig? This cannot be undone")
    ) {
      deleteGig(gigId).then(() => {
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
  };

  return (
    <div id="home-container">
      <h1>My Gigs</h1>

      <div id="all-gigs-container">
        <div>
          <button
            className="button-74"
            id="create-gig-btn"
            onClick={handleCreate}
          >
            + Create Gig
          </button>
        </div>
        {gigsWithVenue.map((gig) => {
          if (new Date(gig.dateTime) > today) {
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
                    {formatDateTime(gig.dateTime).formattedDate} @{" "}
                    <Link to={gig.venueWebsite} target="_blank">
                      {gig.venueName}
                    </Link>
                  </div>
                  <div className="gig-info">
                    <p>
                      Where:{" "}
                      <Link
                        to={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                          gig.venueAddress
                        )}`}
                        target="_blank"
                      >
                        {gig.venueAddress}
                      </Link>
                    </p>
                    <p>When: {formatDateTime(gig.dateTime).formattedTime}</p>
                    <p>
                      How much:{" "}
                      {Number(gig.cost) === 0 ? "Free" : `$${gig.cost}`}
                    </p>
                    <p>Ages: {gig.ages}</p>
                  </div>
                  <div id="gig-buttons">
                    <button
                      value={gig.id}
                      className="button-74"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button
                      value={gig.id}
                      className="button-74"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          }
        })}
      </div>
    </div>
  );
};
