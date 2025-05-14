import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Nav/NavBar";
import { ArtistInfo } from "../components/Artist/ArtistInfo";
import { Home } from "../components/Home";
import { MyGigs } from "../components/MyGigs";
import { CreateGig } from "../components/CreateGig";
import { EditGig } from "../components/EditGig";

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
        <Route path="/artist-info" element={<ArtistInfo />} />
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
