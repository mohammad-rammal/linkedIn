import Card from "../Card/Card";

const ProfileCard = (props) => {
  return (
    <Card padding={0}>
      <div className="relative h-25">
        <div className="relative w-full h-22 rounded-md">
          <img
            src={props?.data?.coverPicture}
            alt="landscape"
            className="rounded-t-md h-full w-full "
          />
        </div>
        <div className="absolute top-14 left-6 z-10 ">
          <img
            src={props?.data?.profilePicture}
            alt="profileImage"
            className="rounded-full border-2 h-16 w-16 border-white cursor-pointer "
          />
        </div>
      </div>
      <div className="p-5 ">
        <div className="text-xl capitalize">{props?.data?.fullName}</div>
        <div className="text-sm my-1">{props?.data?.headline}</div>
        <div className="text-sm my-1">{props?.data?.currentLocation}</div>
        <div className="text-sm my-1">{props?.data?.currentCompany}</div>
      </div>
    </Card>
  );
};
export default ProfileCard;
