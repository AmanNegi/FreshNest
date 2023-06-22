import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import farm from "../../../assets/farm.jpg";
import icon from "../../../assets/logo.png";
import login from "../application/auth";
import { toast } from "react-toastify";
import appState from "../../../data/AppState";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var navigate = useNavigate();
  useEffect(() => {
    if (appState.isUserLoggedIn()) {
      navigate("/shop");
      toast("Logged in as " + appState.getUserData().name);
    }
  }, []);

  return (
    <>
      <section className="float-right relative h-screen w-screen lg:w-[40%] bg-white">
        {/* Top Left Icon and Text */}
        <div className="absolute right-3 top-3">
          <img className="h-[75px] object-contain  mr-1" src={icon} alt="" />
        </div>

        {/* Center Item  */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
          <h1 className="text-2xl font-black text-semiBoldColor">
            Welcome to Agro-Millets
          </h1>
          <p className="font-extralight">Please enter your details</p>
          <div className="pt-10"></div>

          {/* Email Field */}
          <div className="flex flex-col w-[100%]">
            <label htmlFor="input">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              className="bg-semiDarkColor text-sm bg-opacity-10 w-[100%] py-3 mt-1 border-2 outline-none border-white focus:border-darkColor focus:rounded-lg focus:outline-none px-2 transition-all "
            ></input>
          </div>
          <div className="pt-2"></div>
          {/* Password Field */}
          <div className="flex flex-col w-[100%] ">
            <label htmlFor="input">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              className="bg-semiDarkColor text-sm bg-opacity-10 w-[100%] py-3 mt-1 border-2 outline-none border-white focus:border-darkColor focus:rounded-lg focus:outline-none px-2 transition-all "
            ></input>
          </div>
          <div className="pt-5"></div>
          {/* Button */}
          <button
            onClick={async () => {
              if (email.length === 0) {
                toast.error("Enter your email to login");
                return;
              }

              if (password.length === 0) {
                toast.error("Enter your password to login");
                return;
              }
              var data = await login(email, password);
              if (data.statusCode === 200) {
                navigate("/home");
              }
            }}
            className="bg-lightColor rounded-lg text-white font-semibold text-lg w-[100%] py-3 mb-4"
          >
            Login
          </button>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const data = jwtDecode(credentialResponse.credential);
              console.log(data);
              // TODO : Login User

              appState.saveUserData(
                {
                  _id: credentialResponse.clientId,
                  name: data.name,
                  email: data.email,
                  userType: "customer",
                },
                true
              );
              navigate("/home");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </section>
      {/* Image Part */}
      <section className="hidden lg:block float-left h-screen lg:w-[60%] bg-green-300">
        <img className="w-[100%] h-[100%] object-cover" src={farm} alt="" />
      </section>
    </>
  );
}

export default Login;
