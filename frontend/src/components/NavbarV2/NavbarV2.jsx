import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import axios from "axios";
import linkedinLogo from "../../assets/images/LinkedIn_logo_initials.png";
import "./navbarV2.css";
import { toast } from "react-toastify";

const NavbarV2 = () => {
  // const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  const [userData, setUserData] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [notificationCount, setNotificationCount] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      searchAPICall();
    }
  }, [debouncedTerm]);

  const searchAPICall = async () => {
    await axios
      .get(`http://localhost:5000/api/user/findUser?query=${debouncedTerm}`, {
        withCredentials: true,
      })
      .then((res) => {
        setSearchUser(res?.data?.user);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.error);
      });
  };

  const fetchNotification = async () => {
    await axios
      .get("http://localhost:5000/api/notification/activeNotification", {
        withCredentials: true,
      })
      .then((res) => {
        setNotificationCount(res?.data?.count);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.error);
      });
  };

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setUserData(userData ? JSON.parse(userData) : null);

    fetchNotification();
  }, []);

  return (
    <div className="bg-white h-13 flex justify-between py-1 px-5 xl:px-50 fixed top-0 w-[100%] z-1000">
      <div className="flex gap-2 items-center ">
        <Link to={"/feeds"}>
          <img src={linkedinLogo} alt="logo" className="w-8 h-8" />
        </Link>
        <div className=" relative ">
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            type="text"
            className="searchInput w-70 bg-gray-100 rounded-sm h-10 px-4"
            placeholder="Search..."
          />

          {searchUser?.length > 0 && debouncedTerm.length !== 0 && (
            <div className="absolute w-88 left-0 bg-gray-200 ">
              {searchUser?.map((item, index) => {
                return (
                  <Link
                    to={`/profile/${item?._id}`}
                    key={index}
                    onClick={() => setSearchTerm("")}
                    className="flex gap-2 mb-1 items-center p-2 cursor-pointer"
                  >
                    <div>
                      <img
                        src={item?.profilePicture}
                        alt="profileImage"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div>{item?.fullName}</div>
                  </Link>
                );
              })}
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
        <Link
          to={"/resume"}
          className="flex flex-col items-center cursor-pointer"
        >
          <WorkIcon
            sx={{ color: location.pathname === "/resume" ? "black" : "gray" }}
          />
          <div
            className={`text-sm text-gray-500 ${
              location.pathname === "/resume" ? "border-b-3" : ""
            }`}
          >
            Resume
          </div>
        </Link>
        <Link
          to={"/messages"}
          className="flex flex-col items-center cursor-pointer"
        >
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
        </Link>
        <Link
          to={"/notification"}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="relative">
            <AddAlertOutlinedIcon
              sx={{
                color:
                  location.pathname === "/notifications" ? "black" : "gray",
              }}
            />
            {notificationCount && (
              <span className="py-0.5 px-1.5 rounded-full text-xs bg-red-700 text-white  font-bold absolute -top-0.5 -right-1.5">
                {notificationCount}
              </span>
            )}
          </div>
          <div
            className={`text-sm text-gray-500 ${
              location.pathname === "/notifications" ? "border-b-3" : ""
            }`}
          >
            Notification
          </div>
        </Link>
        <Link
          to={`/profile/${userData?._id}`}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            src={userData?.profilePicture}
            alt="profileImage"
            className="w-6 h-6 rounded-full"
          />
          <div className="text-sm text-gray-500">Me</div>
        </Link>
      </div>
    </div>
  );
};
export default NavbarV2;
