import resume from "../../assets/images/resume.png";
import Advertisement from "../../components/Advertisement/Advertisement";

const Resume = () => {
  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100 ">
      <div className="w-[100%] py-5 sm:w-[74%] ">
        <img src={resume} alt="resume" className="w-full h-full rounded-lg " />
      </div>
      <div className="w-[26%] py-5 hidden md:block ">
        <div className="sticky top-19">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};
export default Resume;
