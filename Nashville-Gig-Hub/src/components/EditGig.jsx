import { useEffect, useState } from "react";
import "./CreateGig.css";
import { getAllVenues } from "../services/venueService";
import { getGigById, updateGig } from "../services/gigService";
import { useNavigate, useParams } from "react-router";

export const EditGig = ({ currentUser }) => {
  const [venues, setVenues] = useState([]);
  const [newGig, setNewGig] = useState({
    id: null,
    artistId: null,
    venueId: 0,
    dateTime: "",
    cost: 0,
    ages: "",
  });

  const { gigId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    getAllVenues().then(setVenues);

    getGigById(gigId).then((res) => {
      setNewGig({ ...res, artistId: currentUser.id });
    });

    // Promise.all([getAllVenues(), getGigById(gigId)]).then(
    //   ([venueList, gig]) => {
    //     setVenues(venueList);
    //     gig.artistId = currentUser?.id ?? null;

    //     // Normalize the cost value
    //     const costStr = gig.cost?.toString().trim().toLowerCase();
    //     if (costStr === "free") {
    //       gig.cost = 0;
    //     } else if (costStr.startsWith("$")) {
    //       gig.cost = parseFloat(costStr.replace("$", "")) || 0;
    //     } else {
    //       gig.cost = parseFloat(costStr) || 0;
    //     }

    //     setNewGig(gig);
    //   }
    // );
  }, [gigId, currentUser]);

  const handleEdit = (e) => {
    e.preventDefault();

    if (newGig.venueId && newGig.dateTime && newGig.ages) {
      updateGig(newGig).then(() => {
        navigate(`/my-gigs/${currentUser.id}`);
      });
    } else {
      window.alert("Please complete all required fields");
    }
  };

  const handleSelection = (e) => {
    const { name, value } = e.target;

    setNewGig({
      ...newGig,
      [name]: value,
    });
  };

  return (
    <form id="create-gig">
      <h2>Edit Gig</h2>
      <section className="row">
        <div className="column">
          <h3>Venue:</h3>
        </div>
        <div className="column">
          <select
            id="venue"
            name="venueId"
            value={newGig.venueId}
            required
            onChange={handleSelection}
          >
            <option disabled value="">
              Select Venue:
            </option>
            {venues.map((venue) => {
              return (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              );
            })}
          </select>
        </div>
      </section>
      <section className="row">
        <div className="column">
          <h3>When:</h3>
        </div>
        <div className="column">
          <input
            onChange={handleSelection}
            required
            value={newGig.dateTime}
            type="datetime-local"
            name="dateTime"
          />
        </div>
      </section>
      <section className="row">
        <div className="column">
          <h3>How much:</h3>
        </div>
        <div className="column">
          <input
            onChange={handleSelection}
            type="number"
            value={newGig.cost}
            name="cost"
            required
          />
        </div>
      </section>
      <section className="row">
        <div className="column">
          <h3>Ages:</h3>
        </div>
        <div className="column">
          <select
            name="ages"
            required
            value={newGig.ages}
            onChange={handleSelection}
          >
            <option disabled value="">
              ----
            </option>
            <option>All Ages</option>
            <option>21+</option>
            <option>18+</option>
          </select>
        </div>
      </section>
      <section className="row">
        <button className="button-74" id="create-btn" onClick={handleEdit}>
          Submit
        </button>
      </section>
    </form>
  );
};
