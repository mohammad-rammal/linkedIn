import { useState } from "react";

const ExperienceModal = ({
  selfData,
  handleEditFunction,
  updateExperience,
  setUpdateExperience,
}) => {
  //
  const [data, setData] = useState({
    designation: updateExperience?.clicked
      ? updateExperience?.data?.designation
      : "",

    companyName: updateExperience?.clicked
      ? updateExperience?.data?.companyName
      : "",

    duration: updateExperience?.clicked ? updateExperience?.data?.duration : "",

    location: updateExperience?.clicked ? updateExperience?.data?.location : "",
  });

  const onChangeHandle = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const updateExperienceSave = () => {
    let newFilteredData = selfData?.experience.filter(
      (item) => item._id !== updateExperience?.data?._id
    );

    let newArr = [...newFilteredData, data];
    let newData = { ...selfData, experience: newArr };

    handleEditFunction(newData);
  };

  const handleOnSave = () => {
    if (updateExperience?.clicked) return updateExperienceSave();

    let expArr = [...(selfData?.experience || []), data];
    let newData = { ...selfData, experience: expArr };

    handleEditFunction(newData);
  };

  const handleOnDelete = () => {
    let newFilteredData = selfData?.experience.filter(
      (item) => item._id !== updateExperience?.data?._id
    );

    let newData = { ...selfData, experience: newFilteredData };

    handleEditFunction(newData);
  };

  return (
    <div className="mt-8 w-full h-[350px]  overflow-auto ">
      <div className="w-full mb-4 ">
        <label>Role*</label>
        <br />
        <input
          value={data.designation}
          onChange={(e) => {
            onChangeHandle(e, "designation");
          }}
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Role"
        />
      </div>

      <div className="w-full mb-4 ">
        <label>Company*</label>
        <br />
        <input
          value={data.companyName}
          onChange={(e) => {
            onChangeHandle(e, "companyName");
          }}
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Name Of Company"
        />
      </div>

      <div className="w-full mb-4 ">
        <label>Duration*</label>
        <br />
        <input
          value={data.duration}
          onChange={(e) => {
            onChangeHandle(e, "duration");
          }}
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Duration"
        />
      </div>

      <div className="w-full mb-4 ">
        <label>Place *</label>
        <br />
        <input
          value={data.location}
          onChange={(e) => {
            onChangeHandle(e, "location");
          }}
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Company Place "
        />
      </div>

      <div className="flex justify-between">
        <div
          onClick={handleOnSave}
          className="bg-blue-950 text-white w-fit py-1 px-3 rounded-2xl cursor-pointer "
        >
          Save
        </div>
        {updateExperience?.clicked && (
          <div
            onClick={handleOnDelete}
            className="bg-red-950 text-white w-fit py-1 px-3 rounded-2xl cursor-pointer "
          >
            Delete
          </div>
        )}
      </div>
    </div>
  );
};
export default ExperienceModal;
