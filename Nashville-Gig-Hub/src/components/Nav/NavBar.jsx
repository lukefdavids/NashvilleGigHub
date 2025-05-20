import { Link, useNavigate } from "react-router";
import "./NavBar.css";
export const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/artists">Artists</Link>
      </li>
      <li className="nav-item">
        <Link to="/my-profile">My Profile</Link>
      </li>
      <li className="nav-item">
        <Link to={`/my-gigs/${currentUser.id}`}>My Gigs</Link>
      </li>
      <li className="nav-item">
        <Link to="/">Calendar</Link>
      </li>
      {localStorage.getItem("gighub_user") && (
        <li className="nav-item">
          <Link
            to=""
            onClick={() => {
              localStorage.removeItem("gighub_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      )}
    </ul>
  );
};
