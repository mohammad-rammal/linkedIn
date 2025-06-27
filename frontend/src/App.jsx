import LandingPage from "./pages/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import NavbarV1 from "./components/NavbarV1/NavbarV1";
import NavbarV2 from "./components/NavbarV2/NavbarV2";
import Feeds from "./pages/Feeds/Feeds";
import MyNetwork from "./pages/MyNetwork/MyNetwork";
import Resume from "./pages/Resume/Resume";
import Messages from "./pages/Messages/Messages";
import Profile from "./pages/Profile/Profile";
import Notification from "./pages/Notification/Notification";
import AllActivities from "./pages/AllActivities/AllActivities";
import SingleActivity from "./pages/SingleActivity/SingleActivity";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));

  const changeLoginValue = (val) => {
    setIsLogin(val);
  };

  return (
    <div className="bg-gray-100 w-[100%] h-[100%] box-border">
      {isLogin ? <NavbarV2 /> : <NavbarV1 />}
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? (
              <Navigate to={"/feeds"} />
            ) : (
              <LandingPage changeLoginValue={changeLoginValue} />
            )
          }
        />

        <Route
          path="/sign-up"
          element={
            isLogin ? (
              <Navigate to={"/feeds"} />
            ) : (
              <SignUp changeLoginValue={changeLoginValue} />
            )
          }
        />

        <Route
          path="/login"
          element={
            isLogin ? (
              <Navigate to={"/feeds"} />
            ) : (
              <Login changeLoginValue={changeLoginValue} />
            )
          }
        />

        <Route
          path="/feeds"
          element={isLogin ? <Feeds /> : <Navigate to={"/login "} />}
        />

        <Route
          path="/mynetwork"
          element={isLogin ? <MyNetwork /> : <Navigate to={"/login "} />}
        />
        <Route
          path="/resume"
          element={isLogin ? <Resume /> : <Navigate to={"/login "} />}
        />
        <Route
          path="/notification"
          element={isLogin ? <Notification /> : <Navigate to={"/login "} />}
        />
        <Route
          path="/messages"
          element={isLogin ? <Messages /> : <Navigate to={"/login "} />}
        />
        <Route
          path="/profile/:id"
          element={isLogin ? <Profile /> : <Navigate to={"/login "} />}
        />
        <Route
          path="/profile/:id/activities"
          element={isLogin ? <AllActivities /> : <Navigate to={"/login "} />}
        />
        <Route
          path="/profile/:id/activities/:postId"
          element={isLogin ? <SingleActivity /> : <Navigate to={"/login "} />}
        />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
};
export default App;
