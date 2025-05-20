import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Nav/NavBar";
import { ArtistInfo } from "../components/Artist/ArtistInfo";
import { Home } from "../components/Home";
import { MyGigs } from "../components/MyGigs";
import { CreateGig } from "../components/CreateGig";
import { EditGig } from "../components/EditGig";
import { Artists } from "../components/Artist/Artists";
import { MyProfile } from "../components/Artist/MyProfile";
import { EditProfile } from "../components/Artist/EditProfile";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("gighub_user");
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar currentUser={currentUser} />
            <Outlet />
          </>
        }
      >
        <Route index element={<Home />} />
        <Route
          path="/artists/:artistId"
          element={<ArtistInfo currentUser={currentUser} />}
        />
        <Route
          path="/my-profile"
          element={<MyProfile currentUser={currentUser} />}
        />
        <Route
          path="/edit-profile"
          element={<EditProfile currentUser={currentUser} />}
        />
        <Route path="/artists" element={<Artists />} />
        <Route path="/my-gigs/:currentUser" element={<MyGigs />} />
        <Route
          path="/create-gig"
          element={<CreateGig currentUser={currentUser} />}
        />
        <Route
          path="/edit-gig/:gigId"
          element={<EditGig currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
