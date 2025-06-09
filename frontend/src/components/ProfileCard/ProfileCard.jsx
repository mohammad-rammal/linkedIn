import Card from "../Card/Card";
import landscape from "../../assets/images/landscapeImage.jpg";
import profileImage from "../../assets/images/profileImage.png";

const ProfileCard = () => {
  return (
    <Card padding={0}>
      <div className="relative h-25">
        <div className="relative w-full h-22 rounded-md">
          <img
            src={landscape}
            alt="landscape"
            className="rounded-t-md h-full w-full "
          />
        </div>
        <div className="absolute top-14 left-6 z-10 ">
          <img
            src={profileImage}
            alt="profileImage"
            className="rounded-full border-2 h-16 w-16 border-white cursor-pointer "
          />
        </div>
      </div>
      <div className="p-5 ">
        <div className="text-xl">User name</div>
        <div className="text-sm my-1">@Resume</div>
        <div className="text-sm my-1">City</div>
        <div className="text-sm my-1">Working At</div>
      </div>
    </Card>
  );
};
export default ProfileCard;
