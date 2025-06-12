const MessageModal = () => {
  return (
    <div className="mt-8 w-full h-[350px]  overflow-auto ">
      <div className="w-full mb-4 ">
        <textarea
          cols={10}
          rows={10}
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Message"
        ></textarea>
      </div>

      <div className="bg-blue-950 text-white w-fit py-1 px-3 rounded-2xl cursor-pointer ">
        Send
      </div>
    </div>
  );
};
export default MessageModal;
