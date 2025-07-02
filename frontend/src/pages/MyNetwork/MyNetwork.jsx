import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

const MyNetwork = () => {
  const [text, setText] = useState("Catch up with friends");
  const [data, setData] = useState([]);

  const handleFriends = async () => {
    setText("Catch up with friends");
  };

  const handlePending = async () => {
    setText("Pending Request");
  };

  const fetchFriendList = async () => {
    axios
      .get("http://localhost:5000/api/user/friendsList", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.friends);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const fetchPendingRequest = async () => {
    axios
      .get("http://localhost:5000/api/user/pendingFriendsList", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.pendingFriends);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (text === "Catch up with friends") {
      fetchFriendList();
    } else {
      fetchPendingRequest();
    }
  }, [text]);

  return (
    <div className="px-5 xl:px-50 py-9 flex flex-col gap-5 w-full mt-5 bg-gray-100 min-h-[100vh]">
      <div className="py-4 px-10 border-1 border-gray-400 w-full flex justify-between my-5 text-xl-center bg-white rounded-xl ">
        <div>{text}</div>
        <div className="flex gap-3 ">
          <button
            onClick={handleFriends}
            className={`p-1 cursor-pointer border-1 rounded-lg border-gray-300 
              ${
                text === "Catch up with friends" ? "bg-blue-800 text-white" : ""
              }
            `}
          >
            Friends
          </button>
          <button
            onClick={handlePending}
            className={`p-1 cursor-pointer border-1 rounded-lg border-gray-300
            ${text === "Pending Request" ? "bg-blue-800 text-white" : ""}
            `}
          >
            Pending Request
          </button>
        </div>
      </div>

      <div className="flex h-[80-vh] w-full gap-7 flex-wrap items-start justify-center ">
        {data?.map((item, index) => {
          return (
            <div key={index} className="md:w-[23%] h-[270px] sm:w-full ">
              <ProfileCard data={item} />
            </div>
          );
        })}

        {data?.length === 0 ? (
          text === "Catch up with friends" ? (
            <div>No any friends yet</div>
          ) : (
            <div>No any pending friends yet</div>
          )
        ) : null}
      </div>
    </div>
  );
};
export default MyNetwork;
