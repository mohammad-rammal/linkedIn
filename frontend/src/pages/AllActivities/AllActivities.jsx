import { useParams } from "react-router-dom";
import Advertisement from "../../components/Advertisement/Advertisement";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Card from "../../components/Card/Card";
import Post from "../../components/Post/Post";

const AllActivities = () => {
  const { id } = useParams();

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard />
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
              <div className="">
                <Post />
              </div>
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
