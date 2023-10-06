import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { BiHide, BiShow } from "react-icons/bi";

import { signUp, gSignUp } from "../application/auth";
import appState from "../../../data/AppState";
import getCart from "../../Cart/application/cart";

import farm from "../../../assets/farm.jpg";
import icon from "../../../assets/logo.png";

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  var navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
    phone: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  useEffect(() => {
    if (appState.isUserLoggedIn()) {
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
          <h1 className="text-2xl font-black text-semiBoldColor">
            Register to FreshNest
          </h1>
          <p className="font-extralight">Create an account</p>
          <div className="pt-10"></div>
          {/* Name Field */}
          <div className="flex flex-col w-[100%]">
            <label htmlFor="input">Name</label>
            <input
              name="name"
              onChange={handleFieldChange}
              type="text"
              className="input input-bordered w-full mt-2"
            ></input>
          </div>
          <div className="pt-2"></div>
          {/* Email Field */}
          <div className="flex flex-col w-[100%]">
            <label htmlFor="input">Email</label>
            <input
              name="email"
              onChange={handleFieldChange}
              type="email"
              className="input input-bordered w-full mt-2"
            ></input>
          </div>
          <div className="pt-2"></div>
          {/* Password Field */}
          <div className="flex flex-col w-[100%] ">
            <label htmlFor="input">Password</label>
            <div className="flex flex-row items-end">
              <input
                name="password"
                onChange={handleFieldChange}
                type={passwordVisible ? "text" : "password"}
                className="input input-bordered w-full mt-2"
              ></input>
              <button
                // className="myButton ml-2"
                className="ml-2 btn btn-primary"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <BiHide /> : <BiShow />}
              </button>
            </div>
          </div>
          <div className="pt-2"></div>
          {/* Customer Type */}
          <div className="flex flex-col w-[100%]">
            <label htmlFor="userType">User Type</label>
            <select
              id="userType"
              name="userType"
              value={data.userType}
              onChange={handleFieldChange}
              className="select select-bordered mt-2 w-full"
            >
              <option value="">Select User Type</option>
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>
          <div className="pt-2"></div>
          {/* Phone Field */}
          <div className="flex flex-col w-[100%]">
            <label htmlFor="input">Phone</label>
            <input
              name="phone"
              onChange={handleFieldChange}
              type="phone"
              className="input input-bordered w-full mt-2"
            ></input>
          </div>
          <div className="pt-4"></div>
          <div className="flex flex-row w-full items-center gap-3">
            <button
              onClick={async () => {
                if (data.email.length === 0) {
                  toast.error("Enter your email to signup");
                  return;
                }

                if (data.password.length === 0) {
                  toast.error("Enter your password to signup");
                  return;
                }
                console.log(data);
                const res = await signUp(data);
                if (res.statusCode === 200) {
                  await getCart();
                  navigate("/home");
                }
              }}
              className="btn btn-primary flex-grow py-3 "
            >
              Sign Up
            </button>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const data = jwtDecode(credentialResponse.credential);
                console.log(data);

                const { data: user, statusCode } = await gSignUp(data.name, data.email);

                if (statusCode !== 200) {
                  toast.error("Error while signing in");
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
          </div>
          <div className="mt-10">
            <p>
              {"Already have an account? "}
              <Link to="/" className="text-lightColor font-bold">
                Login
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

  function handleFieldChange(e) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
}

export default SignUp;
