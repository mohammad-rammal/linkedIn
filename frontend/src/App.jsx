import LandingPage from "./pages/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import NavbarV1 from "./components/NavbarV1/NavbarV1";
import NavbarV2 from "./components/NavbarV2/NavbarV2";
import Feeds from "./pages/Feeds/Feeds";

const App = () => {
  const isLogin = true;

  return (
    <div className="bg-gray-100 w-[100%] h-[100%] box-border">
      {isLogin ? <NavbarV2 /> : <NavbarV1 />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feeds" element={<Feeds />} />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
