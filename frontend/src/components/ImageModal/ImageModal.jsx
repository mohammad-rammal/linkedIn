import profileImage from "../../assets/images/profileImage.png";
import postReact from "../../assets/images/postReact.png";

const ImageModal = ({ isCircular }) => {
  return (
    <div className="p-5 relative flex items-center flex-col h-full ">
      {isCircular ? (
        <img className="rounded-full w-[150px] h-[150px] " src={profileImage} />
      ) : (
        <img
          className="rounded-xl w-full h-[200px] object-cover "
          src={postReact}
        />
      )}

      <label
        htmlFor="btn-submit"
        className="absolute bottom-10 left-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer "
      >
        Upload
      </label>
      <input type="file" id="btn-submit" className="hidden" />

      <div className="absolute bottom-10 right-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer ">
        Submit
      </div>
    </div>
  );
};
export default ImageModal;
