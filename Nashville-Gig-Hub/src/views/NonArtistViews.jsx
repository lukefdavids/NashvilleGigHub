import { Routes, Route, Outlet } from "react-router-dom";
import { ArtistInfo } from "../components/Artist/ArtistInfo";
import { Home } from "../components/Home";
import { Artists } from "../components/Artist/Artists";
import { NonArtistNavBar } from "../components/Nav/NonArtistNavBar";
import { useEffect, useState } from "react";

export const NonArtistViews = () => {
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
            <NonArtistNavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Home />} />
        <Route
          path="/artists/:artistId"
          element={<ArtistInfo currentUser={currentUser} />}
        />
        <Route path="/artists" element={<Artists />} />
      </Route>
    </Routes>
  );
};
