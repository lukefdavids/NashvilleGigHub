import { Link } from "react-router";
import "./NavBar.css";
export const NonArtistNavBar = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/artists">Artists</Link>
      </li>

      <li className="nav-item">
        <Link to="/login">
          Artist <br /> sign-in
        </Link>
      </li>
    </ul>
  );
};
