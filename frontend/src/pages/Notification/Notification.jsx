import Card from "../../components/Card/Card";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import profileImage from "../../assets/images/profileImage.png";
import Advertisement from "../../components/Advertisement/Advertisement";

const Notification = () => {
  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100 ">
      {/* Left Side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5 ">
        <div className="h-fit">
          <ProfileCard />
        </div>
      </div>

      {/* Center Side */}
      <div className="w-[100%] py-5 sm:w-[50%] ">
        {/* Notifications */}
        <div>
          <Card padding={0}>
            <div className="w-full">
              {/* For each notification */}
              <div
                className={`border-b-1 cursor-pointer flex gap-4 items-center border-gray-300 p-3`}
              >
                <img
                  src={profileImage}
                  alt="profileImage"
                  className="w-15 h-15 rounded-full cursor-pointer"
                />
                <div className="">Notification one at this day</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-[26%] py-5 hidden md:block ">
        <div className="sticky my-5 top-19 ">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};
export default Notification;
