import { Link } from "react-router-dom";
import linkedinLogo from "../../assets/images/LinkedIn_logo_initials.png";

const NavbarV1 = () => {
  return (
    <nav className="w-[100%] bg-gray-100 px-[20px] md:px-[100px] flex justify-between py-4 box-border">
      <div className="flex justify-between">
        <Link to={"/"} className="flex gap-1 items-center cursor-pointer">
          <h3 className="text-blue-800 font-bold text-3xl">Linked</h3>
          <img src={linkedinLogo} alt="LinkedInLogo" className="w-7 h-7" />
        </Link>
      </div>

      <div className="flex box-border gap-2 md:gap-4 justify-center items-center">
        <Link
          to={"/sign-up"}
          className="md:px-4 md:py-2 box-border text-black rounded-3xl text-xl hover:bg-gray-200 cursor-pointer "
        >
          Join now
        </Link>
        <Link
          to={"/login"}
          className="px-4 py-2 box-border border-1 text-blue-800 border-blue-800 rounded-3xl text-xl hover:bg-blue-50 cursor-pointer"
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
};
export default NavbarV1;
