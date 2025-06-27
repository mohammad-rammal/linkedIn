import postReact from "../../assets/images/postReact.png";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
import { toast } from "react-toastify";

const AddModal = (props) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState("");

  const handlePost = async () => {
    if ((description.trim().length === 0) & !imageUrl)
      return toast.error("Please insert post or image");
  };

  return (
    <div>
      <div className="flex gap-4 items-center">
        <div className="relative">
          <img
            src={props?.personalData?.profilePicture}
            alt="profileImage"
            className="w-15 h-15 rounded-full"
          />
        </div>
        <div className="text-2xl">{props?.personalData?.fullName}</div>
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          cols={50}
          rows={5}
          placeholder="What do you want to talk?"
          className="my-3 outline-0 text-xl p-2"
        ></textarea>
      </div>

      {imageUrl && (
        <div>
          <img
            src={postReact}
            alt="postReact"
            className="w-20 h-20 rounded-xl"
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="my-6">
          <label className="cursor-pointer" htmlFor="inputFile">
            <ImageIcon />
          </label>
          <input type="file" className="hidden" id="inputFile" />
        </div>
        <div
          onClick={handlePost}
          className="bg-blue-950 text-white py-1 px-3 cursor-pointer rounded-2xl h-fit"
        >
          Post
        </div>
      </div>
    </div>
  );
};
export default AddModal;
