import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import farm from "../../../assets/farm.jpg";
import icon from "../../../assets/icon.png";
import login from "../application/auth";
import { toast } from "react-toastify";
import appState from "../../../data/AppState";

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
      <section className="float-left relative h-screen w-screen lg:w-[50%] bg-white">
        {/* Top Left Icon and Text */}
        <div className="absolute flex flex-row justify-center left-3 top-3">
          <img className="h-[25px] mr-1 opacity-50" src={icon} alt="" />
          <p className="text-sm opacity-75 text-slate-500">Agro-Millets</p>
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
              placeholder="Your email address"
              className="bg-semiDarkColor bg-opacity-10 w-[100%] py-3 mt-1 border-2 outline-none border-white focus:border-darkColor focus:rounded-lg focus:outline-none px-2 transition-all "
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
              placeholder="Enter your password"
              className="bg-semiDarkColor bg-opacity-10 w-[100%] py-3 mt-1 border-2 outline-none border-white focus:border-darkColor focus:rounded-lg focus:outline-none px-2 transition-all "
            ></input>
          </div>
          <div className="pt-5"></div>

          {/* Button */}
          <button
            onClick={async () => {
              var data = await login(email, password);
              if (data.statusCode === 200) {
                navigate("/home");
              }
            }}
            className="bg-lightColor rounded-lg text-white font-semibold text-lg w-[100%]  py-3"
          >
            Login
          </button>
        </div>
      </section>
      {/* Image Part */}
      <section className="hidden lg:block float-right h-screen lg:w-[50%] bg-green-300">
        <img className="w-[100%] h-[100%] object-cover" src={farm} alt="" />
      </section>
    </>
  );
}

export default Login;
