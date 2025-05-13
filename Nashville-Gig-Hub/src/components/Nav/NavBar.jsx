import { Link } from "react-router";
import "./NavBar.css";
export const Navbar = ({ currentUser }) => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/">Artists</Link>
      </li>
      <li className="nav-item">
        <Link to="/">My Profile</Link>
      </li>
      <li className="nav-item">
        <Link to={`/my-gigs/${currentUser.id}`}>My Gigs</Link>
      </li>
      <li className="nav-item">
        <Link to="/">Calendar</Link>
      </li>
      <li className="nav-item">
        <Link to="/">Logout</Link>
      </li>
    </ul>
  );
};
