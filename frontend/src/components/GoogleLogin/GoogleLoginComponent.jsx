import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginComponent = (props) => {
  const navigate = useNavigate();

  const handleOnSuccess = async (credRes) => {
    const token = credRes.credential;
    const res = await axios.post(
      "http://localhost:5000/api/auth/google",
      { token },
      { withCredentials: true }
    );
    props.changeLoginValue(true);
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("userInfo", JSON.stringify(res.data.userExist));
    navigate("/feeds");
  };

  return (
    <div className="w-full  ">
      <GoogleLogin
        onSuccess={(credentialResponse) => handleOnSuccess(credentialResponse)}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};
export default GoogleLoginComponent;
