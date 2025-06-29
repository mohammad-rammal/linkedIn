import axios from "axios";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ImageModal = ({ isCircular, selfData, handleEditFunction }) => {
  const [imageLink, setImageLink] = useState(
    isCircular ? selfData?.profilePicture : selfData?.coverPicture
  );

  const [loading, setLoading] = useState(false);

  const handleInputImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "linkedInClone");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/daxgd2nyv/image/upload",
        data
      );

      const imageUrl = response.data.url;
      setImageLink(imageUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBtn = async () => {
    let { data } = { ...selfData };
    if (isCircular) {
      data = { ...data, ["profilePicture"]: imageLink };
    } else {
      data = { ...data, ["coverPicture"]: imageLink };
    }

    handleEditFunction(data);
  };

  return (
    <div className="p-5 relative flex items-center flex-col h-full ">
      {isCircular ? (
        <img className="rounded-full w-[150px] h-[150px] " src={imageLink} />
      ) : (
        <img
          className="rounded-xl w-full h-[200px] object-cover "
          src={imageLink}
        />
      )}

      <label
        htmlFor="btn-submit"
        className="absolute bottom-10 left-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer "
      >
        Upload
      </label>
      <input
        onChange={handleInputImage}
        type="file"
        id="btn-submit"
        className="hidden"
      />

      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div
          onClick={handleSubmitBtn}
          className="absolute bottom-10 right-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer "
        >
          Submit
        </div>
      )}
    </div>
  );
};
export default ImageModal;
