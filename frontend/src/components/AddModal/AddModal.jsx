import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AddModal = (props) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState("");

  // cloudName = daxgd2nyv
  // presetName = linkedInClone

  const handlePost = async () => {
    if ((description.trim().length === 0) & !imageUrl)
      return toast.error("Please insert post or image");

    await axios
      .post(
        "http://localhost:5000/api/post",
        {
          description,
          imageLink: imageUrl,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("The post created");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "linkedInClone");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/daxgd2nyv/image/upload",
        data
      );

      const imageUrl = response.data.url;
      setImageUrl(imageUrl);
    } catch (error) {
      console.log(error);
    }
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
            src={imageUrl}
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
          <input
            onChange={handleUploadImage}
            type="file"
            className="hidden"
            id="inputFile"
          />
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
