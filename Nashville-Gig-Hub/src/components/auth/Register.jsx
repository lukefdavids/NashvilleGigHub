import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByName } from "../../services/userService";

export const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    const newUser = {
      ...user,
    };

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "gighub_user",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.isStaff,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByName(user.name).then((response) => {
      if (response.length > 0) {
        window.alert("Account with that name already exists");
      } else {
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Nashville Gig Hub</h1>
        <h2>Artist sign-up</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="name"
              className="auth-form-input"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>

        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
