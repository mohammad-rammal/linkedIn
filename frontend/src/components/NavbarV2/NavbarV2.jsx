import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";

import linkedinLogo from "../../assets/images/LinkedIn_logo_initials.png";
import profileImage from "../../assets/images/profileImage.png";
import "./navbarV2.css";

const NavbarV2 = () => {
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  return (
    <div className="bg-white h-13 flex justify-between py-1 px-5 xl:px-50 fixed top-0 w-[100%] z-1000">
      <div className="flex gap-2 items-center ">
        <div>
          <img src={linkedinLogo} alt="logo" className="w-8 h-8" />
        </div>
        <div className=" relative ">
          <input
            type="text"
            className="searchInput w-70 bg-gray-100 rounded-sm h-10 px-4"
            placeholder="Search..."
          />

          {dropdown && (
            <div className="absolute w-88 left-0 bg-gray-200 ">
              <div className="flex gap-2 mb-1 items-center p-2 cursor-pointer">
                <div>
                  <img
                    src={profileImage}
                    alt="profileImage"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div>Profile</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hidden gap-10 md:flex">
        <Link
          to={"/feeds"}
          className="flex flex-col items-center cursor-pointer"
        >
          <HomeIcon
            sx={{ color: location.pathname === "/feeds" ? "black" : "gray" }}
          />
          <div
            className={`text-sm text-gray-500 ${
              location.pathname === "/feeds" ? "border-b-3" : ""
            }`}
          >
            Home
          </div>
        </Link>
        <Link
          to={"/mynetwork"}
          className="flex flex-col items-center cursor-pointer"
        >
          <GroupIcon
            sx={{
              color: location.pathname === "/mynetwork" ? "black" : "gray",
            }}
          />
          <div
            className={`text-sm text-gray-500 ${
              location.pathname === "/mynetwork" ? "border-b-3" : ""
            }`}
          >
            My Network
          </div>
        </Link>
        <div className="flex flex-col items-center cursor-pointer">
          <WorkIcon
            sx={{ color: location.pathname === "/jobs" ? "black" : "gray" }}
          />
          <div
            className={`text-sm text-gray-500 ${
              location.pathname === "/jobs" ? "border-b-3" : ""
            }`}
          >
            Jobs
          </div>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <MessageOutlinedIcon
            sx={{
              color: location.pathname === "/messaging" ? "black" : "gray",
            }}
          />
          <div
            className={`text-sm text-gray-500 ${
              location.pathname === "/messaging" ? "border-b-3" : ""
            }`}
          >
            Messaging
          </div>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="relative">
            <AddAlertOutlinedIcon
              sx={{
                color:
                  location.pathname === "/notifications" ? "black" : "gray",
              }}
            />
            <span className="py-0.5 px-1.5 rounded-full text-xs bg-red-700 text-white  font-bold absolute -top-0.5 -right-1.5">
              2
            </span>
          </div>
          <div
            className={`text-sm text-gray-500 ${
              location.pathname === "/notifications" ? "border-b-3" : ""
            }`}
          >
            Notification
          </div>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <img
            src={profileImage}
            alt="profileImage"
            className="w-6 h-6 rounded-full"
          />
          <div className="text-sm text-gray-500">Me</div>
        </div>
      </div>
    </div>
  );
};
export default NavbarV2;
