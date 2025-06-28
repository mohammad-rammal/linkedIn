import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "../../components/Card/Card";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PhotoIcon from "@mui/icons-material/Photo";
import ArticleIcon from "@mui/icons-material/Article";
import Advertisement from "../../components/Advertisement/Advertisement";
import Post from "../../components/Post/Post";
import Modal from "../../components/Modal/Modal";
import AddModal from "../../components/AddModal/AddModal";
import SkeletonList from "../../components/SkeletonItem/SkeletonList";

const Feeds = () => {
  const [personalData, setPersonalData] = useState(null);
  const [post, setPost] = useState([]);

  const [addPostModal, setAddPostModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const [userData, postData] = await Promise.all([
        await axios.get("http://localhost:5000/api/auth/self", {
          withCredentials: true,
        }),
        await axios.get("http://localhost:5000/api/post/getAllPost"),
      ]);

      setPersonalData(userData?.data?.user);
      localStorage.setItem("userInfo", JSON.stringify(userData.data.user));

      setPosts(postData?.data?.post);
    } catch (err) {
      console.log("API error: ", err);
      toast.error(err?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenPostModal = () => {
    setAddPostModal((prev) => !prev);
  };

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard data={personalData} />
        </div>
        <div className="w-full my-5">
          <Card padding={1}>
            <div className="w-full flex justify-between">
              <div>Profile Viewers</div>
              <div className="text-blue-900">30</div>
            </div>
            <div className="w-full flex justify-between">
              <div>Post Impressions</div>
              <div className="text-blue-900">120</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Center Side */}
      <div className="w-[100%] py-5 sm:w-[50%]">
        {/* Post Box */}
        <div>
          <Card padding={1}>
            <div className="flex gap-2 items-center">
              <img
                src={personalData?.profilePicture}
                alt="profile"
                className="rounded-4xl w-13 h-1/3 border-2 border-white cursor-pointer"
              />
              <div
                onClick={() => setAddPostModal(true)}
                className="w-full border p-3 rounded-3xl cursor-pointer hover:bg-gray-100"
              >
                Start a post
              </div>
            </div>
            <div className="w-full flex mt-3">
              <div
                onClick={() => setAddPostModal(true)}
                className="flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100"
              >
                <VideoCallIcon sx={{ color: "green" }} />
                Video
              </div>
              <div
                onClick={() => setAddPostModal(true)}
                className="flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100"
              >
                <PhotoIcon sx={{ color: "blue" }} />
                Photo
              </div>
              <div
                onClick={() => setAddPostModal(true)}
                className="flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100"
              >
                <ArticleIcon sx={{ color: "orange" }} />
                Article
              </div>
            </div>
          </Card>
        </div>

        <div className="border-b border-gray-400 w-full my-5" />

        {/* Feed Posts */}
        <div className="w-full flex flex-col gap-5">
          {loading ? (
            <SkeletonList count={3} type="post" />
          ) : (
            posts?.map((item, index) => (
              <Post
                key={index}
                item={item}
                personalData={personalData}
                postKey={index}
              />
            ))
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-[26%] py-5 hidden md:block">
        <div>
          <Card padding={1}>
            <div className="text-xl">LinkedIn News</div>
            <div className="text-gray-600">Top stories</div>
            <div className="my-1">
              <div className="text-md">Buffet to remain Ber chair</div>
              <div className="text-xs text-gray-400">5h ago</div>
            </div>
            <div className="my-1">
              <div className="text-md">Buffet chair</div>
              <div className="text-xs text-gray-400">7h ago</div>
            </div>
          </Card>
        </div>
        <div className="sticky my-5 top-19">
          <Advertisement />
        </div>
      </div>

      {/* Modal */}
      {addPostModal && (
        <Modal title={""} closeModal={handleOpenPostModal}>
          <AddModal personalData={personalData} />
        </Modal>
      )}
    </div>
  );
};

export default Feeds;
