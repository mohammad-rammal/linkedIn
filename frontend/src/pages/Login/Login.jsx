import { Link, useNavigate } from "react-router-dom";
import GoogleLoginComponent from "../../components/GoogleLogin/GoogleLoginComponent";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const [loginField, setLoginField] = useState({ email: "", password: "" });

  const onChangeInput = (e, key) => {
    setLoginField({ ...loginField, [key]: e.target.value });
  };

  const handleLogin = async () => {
    if (
      loginField.email.trim().length === 0 ||
      loginField.password.trim().length === 0
    ) {
      return toast.error("Missing fields");
    }

    await axios
      .post("http://localhost:5000/api/auth/login", loginField, {
        withCredentials: true,
      })
      .then((res) => {
        props.changeLoginValue(true);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("userInfo", JSON.stringify(res.data.userExist));
        navigate("/feeds");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.error);
      });
  };

  return (
    <div className="w-full  flex flex-col items-center justify-center">
      <div className="w-[85%] md:w-[28%] shadow-xl rounded-sm box  p-10 mt-10 ">
        <div className="text-3xl">Sign In</div>

        <div className="my-5">
          <GoogleLoginComponent />
        </div>

        <div className="flex items-center gap-2 justify-between relative ">
          <div className="border-b-1 border-gray-400 w-[45%] " />
          <div className="absolute top-[20%] right-[48%]">or</div>
          <div className="border-b-1 border-gray-400 w-[45%] my-6 " />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={loginField.email}
              onChange={(e) => {
                onChangeInput(e, "email");
              }}
              type="text"
              className="w-full text-xl border-2 rounded-lg px-5 py-1 "
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={loginField.password}
              onChange={(e) => {
                onChangeInput(e, "password");
              }}
              type="password"
              className="w-full text-xl border-2 rounded-lg px-5 py-1 "
              placeholder="Password"
            />
          </div>

          <div
            onClick={handleLogin}
            className="w-full hover:bg-blue-900 bg-blue-800 text-white py-3 px-4 rounded-xl text-center text-xl cursor-pointer "
          >
            Sign in
          </div>
        </div>
      </div>

      <div className="mt-4 mb-14 ">
        New to LinkedIn?{" "}
        <Link to={"/sign-up"} className="text-blue-800 cursor-pointer">
          Join Now
        </Link>
      </div>
    </div>
  );
};
export default Login;
