import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const MessageModal = ({ userData, selfData }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    await axios
      .post(
        "http://localhost:5000/api/conversation/add-conversation",
        { receiverId: userData?._id, message },
        { withCredentials: true }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("API error: ", err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="mt-8 w-full h-[350px]  overflow-auto ">
      <div className="w-full mb-4 ">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          cols={10}
          rows={10}
          className="p-2 mt-1 w-full border-1 rounded-md "
          placeholder="Enter Message"
        ></textarea>
      </div>

      <div
        onClick={handleSendMessage}
        className="bg-blue-950 text-white w-fit py-1 px-3 rounded-2xl cursor-pointer "
      >
        Send
      </div>
    </div>
  );
};
export default MessageModal;
