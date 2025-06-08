import profileImage from "../../assets/images/profileImage.png";
import postReact from "../../assets/images/postReact.png";
import ImageIcon from "@mui/icons-material/Image";

const AddModal = () => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <div className="relative">
          <img
            src={profileImage}
            alt="profileImage"
            className="w-15 h-15 rounded-full"
          />
        </div>
        <div className="text-2xl">User name</div>
      </div>
      <div>
        <textarea
          cols={50}
          rows={5}
          placeholder="What do you want to talk?"
          className="my-3 outline-0 text-xl p-2"
        ></textarea>
      </div>
      <div>
        <img src={postReact} alt="postReact" className="w-20 h-20 rounded-xl" />
      </div>
      <div className="flex justify-between items-center">
        <div className="my-6">
          <label className="cursor-pointer" htmlFor="inputFile">
            <ImageIcon />
          </label>
          <input type="file" className="hidden" id="inputFile" />
        </div>
        <div className="bg-blue-950 text-white py-1 px-3 cursor-pointer rounded-2xl h-fit">
          Post
        </div>
      </div>
    </div>
  );
};
export default AddModal;
