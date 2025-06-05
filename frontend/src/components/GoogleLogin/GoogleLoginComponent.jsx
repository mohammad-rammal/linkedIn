import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginComponent = () => {
  const handleOnSuccess = (credRes) => {
    console.log(credRes);
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
