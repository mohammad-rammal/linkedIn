import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import profileImage from "../../assets/images/profileImage.png";
import Advertisement from "../../components/Advertisement/Advertisement";
import SkeletonList from "../../components/SkeletonItem/SkeletonList";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [ownData, setOwnData] = useState(null);

  const navigate = useNavigate();

  const fetchNotificationData = async () => {
    await axios
      .get("http://localhost:5000/api/notification", {
        withCredentials: true,
      })
      .then((res) => {
        setNotifications(res?.data?.notifications);
      })
      .catch((err) => {
        console.log("API error: ", err);
        toast.error("Something went wrong!");
      });
    setLoading(false);
  };

  const handleOnClickNotification = async (item) => {
    await axios
      .put(
        "http://localhost:5000/api/notification/isRead",
        {
          notificationId: item?._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (item?.type === "comment") {
          navigate(`/profile/${ownData?._id}/activities/${item?.postId}`);
        } else {
          navigate("/myNetwork");
        }
      })
      .catch((err) => {
        console.log("API error: ", err);
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);

    fetchNotificationData();
  }, []);

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard data={ownData} />
        </div>
      </div>

      {/* Center Side */}
      <div className="w-full py-5 sm:w-[50%] min-h-[100vh] ">
        <Card padding={0}>
          <div className="w-full">
            {loading ? (
              <SkeletonList count={4} type="notification" />
            ) : (
              notifications?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleOnClickNotification(item)}
                  className={`border-b border-gray-300 p-3 flex gap-4 items-center cursor-pointer ${
                    item?.isRead ? "bg-gray-200" : "bg-blue-100"
                  }`}
                >
                  <img
                    src={item?.sender?.profilePicture}
                    alt="profile"
                    className="w-15 h-15 rounded-full"
                  />
                  <div>{item?.content}</div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Right Side */}
      <div className="w-[26%] py-5 hidden md:block">
        <div className="sticky my-5 top-19">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default Notification;
