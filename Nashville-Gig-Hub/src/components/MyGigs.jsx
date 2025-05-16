import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
// import { getUserById } from "../services/userService";
import { deleteGig, getGigsByUserId } from "../services/gigService";
import { formatDateTime } from "./utilities/utilities";
import { getAllVenues } from "../services/venueService";
import "./MyGigs.css";

export const MyGigs = () => {
  //   const [user, setUser] = useState({});
  const [gigs, setGigs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [gigsWithVenue, setGigsWithVenue] = useState([]);
  const { currentUser } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getGigsByUserId(currentUser).then(setGigs);
    getAllVenues().then(setVenues);
  }, [currentUser]);

  useEffect(() => {
    if (gigs && venues) {
      const gigsPlusVenue = gigs.map((gig) => {
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
                  <img src="/img/Instagram_logo.png" alt="Instagram logo" />
                  <img
                    className="spotify-img"
                    src="/img/Spotify_logo.png"
                    alt="Spotify logo"
                  />
                  <img src="/img/Facebook_logo.png" alt="Facebook logo" />
                  <img
                    className="website-img"
                    src="/img/website_logo.jpg"
                    alt="Generic Website logo"
                  />
                </div>
              </div>
              <div className="gig-right">
                <div className="date">
                  {formatDateTime(gig.dateTime).formattedDate} @ {gig.venueName}
                </div>
                <div className="gig-info">
                  <p>Where: {gig.venueAddress}</p>
                  <p>When: {formatDateTime(gig.dateTime).formattedTime}</p>
                  <p>How much: {gig.cost === 0 ? "Free" : `$${gig.cost}`}</p>
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
        })}
      </div>
    </div>
  );
};
