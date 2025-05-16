import { useEffect, useState } from "react";
import "./CreateGig.css";
import { getAllVenues } from "../services/venueService";
import { postNewGig } from "../services/gigService";
import { useNavigate } from "react-router";

export const CreateGig = ({ currentUser }) => {
  const [venues, setVenues] = useState([]);
  const [newGig, setNewGig] = useState({
    artistId: null,
    venueId: 0,
    dateTime: "",
    cost: "",
    ages: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    getAllVenues().then(setVenues);
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      setNewGig((prevGig) => ({
        ...prevGig,
        artistId: currentUser.id,
      }));
    }
  }, [currentUser]);
  const handleCreate = (e) => {
    e.preventDefault();

    if (newGig.venueId && newGig.dateTime && newGig.cost && newGig.ages) {
      postNewGig(newGig).then(() => {
        navigate(`/my-gigs/${currentUser.id}`);
      });
    } else {
      window.alert("Please complete all required fields");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewGig({
      ...newGig,
      [name]: name.includes("Id") ? parseInt(value) : value,
    });
  };

  return (
    <form id="create-gig">
      <h2>Create Gig</h2>
      <section className="row">
        <div className="column">
          <h3>Venue:</h3>
        </div>
        <div className="column">
          <select
            id="venue"
            name="venueId"
            defaultValue=""
            required
            onChange={handleChange}
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
            onChange={handleChange}
            required
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
            onChange={handleChange}
            type="number"
            min="0"
            placeholder="0"
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
          <select name="ages" required onChange={handleChange} defaultValue="">
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
        <button className="button-74" id="create-btn" onClick={handleCreate}>
          Create
        </button>
      </section>
    </form>
  );
};
