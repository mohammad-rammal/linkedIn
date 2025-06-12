const AboutModal = () => {
  return (
    <div className="my-8 w-full h-[350px]  overflow-auto ">
      <div className="w-full mb-4 ">
        <label>About*</label>
        <br />
        <textarea
          cols={10}
          rows={3}
          className="p-2 mt-1 w-full border-1 rounded-md "
        ></textarea>
      </div>

      <div className="w-full mb-4 ">
        <label>Skills* (Add by separating comma)</label>
        <br />
        <textarea
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
        <input type="file" className="hidden" id="resumeUpload" />
        <div className="my-2">nameOfResume</div>
      </div>

      <div className="bg-blue-950 text-white w-fit py-1 px-3 rounded-2xl cursor-pointer ">
        Save
      </div>
    </div>
  );
};
export default AboutModal;
