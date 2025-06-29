import { useState } from "react";

const EditInfoModal = ({ selfData, handleEditFunction }) => {
  const [data, setData] = useState({
    fullName: selfData?.fullName,
    headline: selfData?.headline,
    currentCompany: selfData?.currentCompany,
    currentLocation: selfData?.currentLocation,
  });

  const onChangeHandle = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const handleSaveBtn = async () => {
    let newData = { ...selfData, ...data };
    handleEditFunction(newData);
  };

  return (
    <div className="mt-8 w-full h-[350px]  overflow-auto ">
      <div className="w-full mb-4 ">
        <label>Full Name*</label>
        <br />
        <input
          value={data.fullName}
          onChange={(e) => {
            onChangeHandle(e, "fullName");
          }}
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Full Name"
        />
      </div>
      <div className="w-full mb-4 ">
        <label>Headline*</label>
        <br />
        <textarea
          value={data.headline}
          onChange={(e) => {
            onChangeHandle(e, "headline");
          }}
          cols={10}
          rows={3}
          className="p-2 mt-1 w-full border-1 rounded-md "
        ></textarea>
      </div>
      <div className="w-full mb-4 ">
        <label>Current Company*</label>
        <br />
        <input
          value={data.currentCompany}
          onChange={(e) => {
            onChangeHandle(e, "currentCompany");
          }}
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Current Company"
        />
      </div>
      <div className="w-full mb-4 ">
        <label>Current Location*</label>
        <br />
        <input
          value={data.currentLocation}
          onChange={(e) => {
            onChangeHandle(e, "currentLocation");
          }}
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Current Location"
        />
      </div>
      <div
        onClick={handleSaveBtn}
        className="bg-blue-950 text-white w-fit py-1 px-3 rounded-2xl cursor-pointer "
      >
        Save
      </div>
    </div>
  );
};
export default EditInfoModal;
