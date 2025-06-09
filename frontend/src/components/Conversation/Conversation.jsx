import profileImage from "../../assets/images/profileImage.png";

const Conversation = () => {
  return (
    <div className="flex items-center w-full cursor-pointer border-b-1 border-gray-300 gap-3 p-4 hover:bg-gray-200">
      <div className="shrink-0  ">
        <img
          src={profileImage}
          alt="profileImage"
          className="w-12 h-12 rounded-[100%] cursor-pointer"
        />
      </div>
      <div>
        <div className="text-md">Username</div>
        <div className="text-sm text-gray-500">Job</div>
      </div>
    </div>
  );
};
export default Conversation;
