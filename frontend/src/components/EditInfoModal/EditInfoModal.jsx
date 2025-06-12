const EditInfoModal = () => {
  return (
    <div className="mt-8 w-full h-[350px]  overflow-auto ">
      <div className="w-full mb-4 ">
        <label>Full Name</label>
        <br />
        <input
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Full Name"
        />
      </div>
      <div className="w-full mb-4 ">
        <label>Headline</label>
        <br />
        <textarea
          cols={10}
          rows={3}
          className="p-2 mt-1 w-full border-1 rounded-md "
        ></textarea>
      </div>
      <div className="w-full mb-4 ">
        <label>Current Company</label>
        <br />
        <input
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Current Company"
        />
      </div>
      <div className="w-full mb-4 ">
        <label>Current Location</label>
        <br />
        <input
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Current Location"
        />
      </div>
      <div className="bg-blue-950 text-white w-fit py-1 px-3 rounded-2xl cursor-pointer ">
        Save
      </div>
    </div>
  );
};
export default EditInfoModal;
