const ExperienceModal = () => {
  return (
    <div className="mt-8 w-full h-[350px]  overflow-auto ">
      <div className="w-full mb-4 ">
        <label>Role*</label>
        <br />
        <input
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Role"
        />
      </div>

      <div className="w-full mb-4 ">
        <label>Company*</label>
        <br />
        <input
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Name Of Company"
        />
      </div>

      <div className="w-full mb-4 ">
        <label>Duration*</label>
        <br />
        <input
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Duration"
        />
      </div>

      <div className="w-full mb-4 ">
        <label>Place *</label>
        <br />
        <input
          type="text"
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Company Place "
        />
      </div>

      <div className="bg-blue-950 text-white w-fit py-1 px-3 rounded-2xl cursor-pointer ">
        Save
      </div>
    </div>
  );
};
export default ExperienceModal;
