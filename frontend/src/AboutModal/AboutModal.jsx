import axios from "axios";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AboutModal = ({ selfData, handleEditFunction }) => {
  const [data, setData] = useState({
    about: selfData?.about,
    skillsInp: selfData?.skills?.join(","),
    resume: selfData?.resume,
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandle = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

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
      setData({ ...data, resume: imageUrl });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const HandleOnSave = async () => {
    let arr = data?.skillsInp?.split(",");

    let newData = {
      ...selfData,
      about: data.about,
      skills: arr,
      resume: data.resume,
    };

    handleEditFunction(newData);
  };

  return (
    <div className="my-8 w-full h-[350px]  overflow-auto ">
      <div className="w-full mb-4 ">
        <label>About*</label>
        <br />
        <textarea
          value={data.about}
          onChange={(e) => {
            onChangeHandle(e, "about");
          }}
          cols={10}
          rows={3}
          className="p-2 mt-1 w-full border-1 rounded-md "
        ></textarea>
      </div>

      <div className="w-full mb-4 ">
        <label>Skills* (Add by separating comma)</label>
        <br />
        <textarea
          value={data.skillsInp}
          onChange={(e) => {
            onChangeHandle(e, "skillsInp");
          }}
          cols={10}
          rows={3}
          className="p-2 mt-1 w-full border-1 rounded-md "
        ></textarea>
      </div>

      <div className="w-full mb-4 ">
        <label
          htmlFor="resumeUpload"
          className="p-2 bg-blue-800 text-white rounded-lg cursor-pointer"
        >
          Resume Upload
        </label>
        <input
          onChange={handleInputImage}
          type="file"
          className="hidden"
          id="resumeUpload"
        />
        {loading && (
          <Box sx={{ display: "flex", marginTop: "10px" }}>
            <CircularProgress size="30px" />
          </Box>
        )}
        {data.resume && <div className="my-2">{data.resume}</div>}
      </div>

      <div
        onClick={HandleOnSave}
        className="bg-blue-950 text-white w-fit py-1 px-3 rounded-2xl cursor-pointer "
      >
        Save
      </div>
    </div>
  );
};
export default AboutModal;
