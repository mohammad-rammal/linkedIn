import { Link } from "react-router-dom";
import landingPage from "../../assets/images/landingPage.png";
import GoogleLoginComponent from "../../components/GoogleLogin/GoogleLoginComponent";

const LandingPage = (props) => {
  return (
    <div className="my-4 py-[50px] md:pl-[120px] px-5 md:flex justify-between">
      <div className="md:w-[40%]">
        <div className="text-4xl mx-auto text-gray-500 capitalize">
          welcome to your professional community
        </div>
        <div className="my-3 flex mx-auto mt-[20px] bg-white gap-2 rounded-3xl w-[70%] text-black cursor-pointer ">
          <GoogleLoginComponent changeLoginValue={props.changeLoginValue} />
        </div>

        <Link
          to={"/login"}
          className="flex mx-auto mt-[20px] py-2 px-2 bg-white gap-2 rounded-3xl items-center w-[70%] justify-center text-black hover:bg-gray-100 border-2 cursor-pointer "
        >
          Sing in with email
        </Link>
        <div className="mx-auto mb-4 text-xs w-[70%] mt-6 text-center opacity-75">
          By clicking Continue to join or sign in, you agree to LinkedIn’s{" "}
          <span className="text-blue-800 cursor-pointer hover:underline">
            User Agreement, Privacy Policy
          </span>
          , and{" "}
          <span className="text-blue-800 cursor-pointer hover:underline">
            Cookie Policy
          </span>
          .
        </div>
        <div className="mx-auto text-center mb-4 text-lg w-[70%] mt-8">
          New to LinkedIn?{" "}
          <Link
            to={"/sign-up"}
            className="text-blue-800 cursor-pointer hover:underline"
          >
            Join now
          </Link>
        </div>
      </div>

      <div className="md:w-[50%] h-130">
        <img src={landingPage} alt="landingPage" className="w-full h-full" />
      </div>
    </div>
  );
};
export default LandingPage;
