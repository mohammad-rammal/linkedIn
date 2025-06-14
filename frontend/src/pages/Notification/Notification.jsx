import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import profileImage from "../../assets/images/profileImage.png";
import Advertisement from "../../components/Advertisement/Advertisement";
import SkeletonList from "../../components/SkeletonItem/SkeletonList";

const Notification = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotifications([
        "Notification one at this day",
        "Someone liked your post",
        "New connection request",
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard />
        </div>
      </div>

      {/* Center Side */}
      <div className="w-full py-5 sm:w-[50%]">
        <Card padding={0}>
          <div className="w-full">
            {loading ? (
              <SkeletonList count={4} type="notification" />
            ) : (
              notifications.map((note, index) => (
                <div
                  key={index}
                  className="border-b border-gray-300 p-3 flex gap-4 items-center cursor-pointer"
                >
                  <img
                    src={profileImage}
                    alt="profile"
                    className="w-15 h-15 rounded-full"
                  />
                  <div>{note}</div>
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
