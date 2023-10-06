import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import appState from "../../../data/AppState";
import getCart from "../../Cart/application/cart";
import login, { gSignUp } from "../application/auth";

import farm from "../../../assets/farm.jpg";
import icon from "../../../assets/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var navigate = useNavigate();

  useEffect(() => {
    if (appState.isUserLoggedIn()) {
      console.log(appState);
      navigate("/shop");
      toast("Logged in as " + appState.getUserData().name);
    }
  }, []);

  return (
    <>
      <section className="float-right relative h-screen w-screen lg:w-[40%]">
        {/* Top Left Icon and Text */}
        <div className="absolute right-3 top-3">
          <img className="h-[75px] object-contain  mr-1" src={icon} alt="" />
        </div>

        {/* Center Item  */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
          <h1 className="text-2xl font-black">Welcome to FreshNest</h1>
          <p className="font-extralight">Please enter your details</p>
          <div className="pt-10"></div>

          {/* Email Field */}

          <div className="flex flex-col w-[100%]">
            <label htmlFor="input">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder=""
              className="input input-bordered w-full mt-2"
            />
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
              className="input input-bordered w-full mt-2"
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
                await getCart();
                navigate("/home");
              }
            }}
            className="btn btn-primary w-full py-3 mb-4"
          >
            Login
          </button>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              // Save user to backend as well
              const data = jwtDecode(credentialResponse.credential);
              console.log(data);

              var { data: user, statusCode } = await gSignUp(data.name, data.email);
              if (statusCode !== 200) {
                toast.error("Error while logging in");
                return;
              }
              appState.saveUserData(
                {
                  _id: user._id,
                  name: data.name,
                  email: data.email,
                  userType: "customer",
                },
                true,
              );
              await getCart();
              navigate("/home");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <div className="mt-10">
            <p>
              {"Don't have an account? "}
              <Link to="/register" className="text-lightColor font-bold">
                Sign up
              </Link>
            </p>
          </div>
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
