import Card from "../Card/Card";
import profileImage from "../../assets/images/profileImage.png";
import { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast } from "react-toastify";

const Post = ({ profile, item, personalData, postKey }) => {
  const [seeMore, setSeeMore] = useState(false);
  const [comment, setComment] = useState(false);

  const [comments, setComments] = useState([]);

  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(item?.likes.length);

  useEffect(() => {
    let selfId = personalData?._id;
    item?.likes?.map((item) => {
      if (item.toString() === selfId.toString()) {
        setLiked(true);
        return;
      } else {
        setLiked(false);
      }
    });
  }, []);

  const handleLike = async () => {
    await axios
      .post(
        "http://localhost:5000/api/post/likeDislike",
        { postId: item?._id },
        { withCredentials: true }
      )
      .then((res) => {
        if (liked) {
          setNumberOfLikes((prev) => prev - 1);
          setLiked(false);
        } else {
          setLiked(true);
          setNumberOfLikes((prev) => prev + 1);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  const handleShow = () => {
    setSeeMore((prev) => !prev);
  };

  const handleSendComment = (e) => {
    e.preventDefault();
  };

  const handleCommentBoxOpenClose = async () => {
    setComment((prev) => !prev);

    await axios
      .get(`http://localhost:5000/api/comment/${item?._id}`)
      .then((res) => {
        setComments(res.comments);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  const desc = item?.description;

  return (
    <Card padding={0} key={postKey}>
      <div className="flex gap-3 p-4">
        <div className="w-12 h-12 rounded-4xl">
          <img
            src={item?.user?.profilePicture}
            alt="profileImage"
            className="w-12 h-12 rounded-4xl border-2 border-white cursor-pointer"
          />
        </div>
        <div>
          <div className="text-lg font-semibold capitalize">
            {item?.user?.fullName}
          </div>
          <div className="text-xs text-gray-500 ">{item?.user?.headline}</div>
        </div>
      </div>

      {desc?.length > 0 && (
        <div className="text-md p-4 my-3 whitespace-pre-line flex-grow ">
          {desc ? (seeMore ? desc : `${desc.slice(0, 50)}...`) : null}
          {desc?.length >= 50 && (
            <span onClick={handleShow} className="text-gray-500 cursor-pointer">
              {seeMore ? "See Less" : "See More"}
            </span>
          )}
        </div>
      )}

      {item?.imageLink && (
        <div className="w-[100%] h-[300px] ">
          <img
            src={item?.imageLink}
            alt="postReact"
            className="w-full h-full  "
          />
        </div>
      )}
      <div className="my-2 p-4 flex justify-between items-center ">
        <div className="flex gap-1 items-center ">
          <ThumbUpIcon sx={{ color: "blue", fontSize: 18 }} />
          <div className="text-sm text-gray-600">{numberOfLikes} Likes</div>
        </div>
        <div className="flex gap-1 items-center ">
          <div className="text-sm text-gray-600">{item?.comments} Comments</div>
        </div>
      </div>

      {/* Bar of Like, Comment, Share */}
      {!profile && (
        <div className="flex p-1">
          <div
            onClick={handleLike}
            className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100 "
          >
            {liked ? (
              <ThumbUpIcon sx={{ fontSize: 22, color: "blue" }} />
            ) : (
              <ThumbUpOutlinedIcon sx={{ fontSize: 22 }} />
            )}
            <span>{liked ? "Liked" : "Like"}</span>
          </div>
          <div
            onClick={handleCommentBoxOpenClose}
            className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100 "
          >
            <InsertCommentIcon sx={{ fontSize: 22 }} /> <span>Comment</span>
          </div>
          <div className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100 ">
            <SendIcon sx={{ fontSize: 22 }} /> <span>Share</span>
          </div>
        </div>
      )}

      {/* Comment Section */}
      {comment && (
        <div className="p-4 w-full">
          <div className="flex gap-2 items-center">
            <img
              src={profileImage}
              alt="profileImage"
              className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
            />
            <form className="w-full flex gap-2" onSubmit={handleSendComment}>
              <input
                type="text"
                className="w-full border-1 py-3 px-5 rounded-3xl hover:bg-gray-100"
                placeholder="Add a comment"
              />
              <button
                type="submit"
                className="cursor-pointer bg-blue-800 text-white rounded-3xl py-1 px-3"
              >
                Send
              </button>
            </form>
          </div>

          {/* Others comment section */}
          <div className="w-full p-4 ">
            <div className="my-4  ">
              <div className="flex gap-3">
                <img
                  src={profileImage}
                  alt="profileImage"
                  className="w-10 h-10 rounded-4xl border-2 border-white cursor-pointer"
                />
                <div className="cursor-pointer">
                  <div className="text-md">Username</div>
                  <div className="text-sm text-gray-500">@Office Resume</div>
                </div>
              </div>
            </div>
            <div className="px-11 my-2">Thanks for post</div>
          </div>
        </div>
      )}
    </Card>
  );
};
export default Post;
