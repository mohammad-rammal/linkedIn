import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Advertisement from "../../components/Advertisement/Advertisement";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Card from "../../components/Card/Card";
import Post from "../../components/Post/Post";
import { toast } from "react-toastify";

const AllActivities = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [ownData, setOwnData] = useState(null);

  const fetchDataOnLoad = async () => {
    await axios
      .get(`http://localhost:5000/api/post/getAllPostForUser/${id}`)
      .then((res) => {
        setPosts(res?.data?.post);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.error);
      });
  };

  useEffect(() => {
    fetchDataOnLoad();

    let userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);
  }, [id]);

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard data={posts[0]?.user} />
        </div>
      </div>

      {/* Center Side */}
      <div className="w-[100%] py-5 sm:w-[50%]">
        <div>
          <Card padding={1}>
            <div className="text-xl">All Activity</div>
            <div className="w-fit p-2 rounded-4xl bg-green-800 my-2 text-white font-semibold cursor-pointer">
              Posts
            </div>

            <div className="my-2 flex flex-col gap-2">
              {posts?.map((item, index) => {
                return (
                  <div key={index}>
                    <Post item={item} personalData={ownData} />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-[26%] py-5 hidden md:block">
        <div className="sticky my-5 top-19">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};
export default AllActivities;
