import Card from "../Card/Card";
import landscape from "../../assets/images/landscapeImage.jpg";
import { useEffect, useState } from "react";

const Advertisement = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setUserData(useState ? JSON.parse(userData) : null);
  }, []);

  return (
    <div className="sticky top-18">
      <Card padding={0}>
        <div className="relative h-25">
          <div className="relative w-full h-22 rounded-md">
            <img
              src={landscape}
              alt="landscape"
              className="rounded-t-md h-full w-full "
            />
          </div>
          <div className="absolute top-14 left-[40%] z-10 ">
            <img
              src={userData?.profilePicture}
              alt="profileImage"
              className="rounded-full border-2 h-14 w-14 border-white cursor-pointer "
            />
          </div>
        </div>
        <div className="px-5 my-5 mx-auto ">
          <div className="text-sm font-semibold text-center capitalize">
            {userData?.fullName}
          </div>
          <div className="text-sm my-3 text-center ">
            Get the latest jobs and industry news
          </div>
          <div className="text-sm my-1 border-1 text-center p-2 rounded-2xl font-bold border-blue-950 text-white bg-blue-800 cursor-pointer ">
            Explore
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Advertisement;
