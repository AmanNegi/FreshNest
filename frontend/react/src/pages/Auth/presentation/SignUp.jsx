import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signUp } from '../application/auth';
import appState from '../../../data/AppState';
import getCart from '../../Cart/application/cart';
import ButtonLoader from '../../../components/ButtonLoader';
import GLoginButton from './components/GLoginButton';

import farm from '../../../assets/farm.webp';
import icon from '../../../assets/logo.png';
import PasswordField from './components/PasswordField';

function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    userType: '',
    phone: ''
  });

  useEffect(() => {
    getLocation(setData, data);
    if (appState.isUserLoggedIn()) {
      navigate('/shop');
      toast('Logged in as ' + appState.getUserData().name);
    }
  }, []);

  const handleSignUp = async () => {
    if (data.email.length === 0) {
      toast.error('Enter your email to sign up');
      return;
    }

    if (data.password.length === 0) {
      toast.error('Enter your password to sign up');
      return;
    }

    if (data.userType.length === 0) {
      toast.error('Select your user type to register');
      return;
    }

    if (data.phone.length < 10) {
      toast.error('Enter a correct phone number to continue');
      return;
    }
    if (data.longitude === '' || data.latitude === '') {
      toast.error('Unable to get your location, try reloading the page or providing access.');
      return;
    }

    try {
      setLoading(true);
      const res = await signUp(data);
      if (res.statusCode === 200) {
        await getCart();
        navigate('/home');
      }
    } catch (error) {
      toast.error('Sign-up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="float-right relative h-screen w-screen lg:w-[40%]">
        {/* Top Right Icon and Text */}
        <div className="absolute right-3 top-3 cursor-pointer z-[1]" onClick={() => navigate('/')}>
          <img className="h-[75px] object-contain  mr-1" src={icon} alt="" />
        </div>

        {/* Center Item  */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 max-w-lg mx-auto">
          <h1 className="text-2xl font-black text-semiBoldColor">Register to FreshNest</h1>
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
          <PasswordField handleFieldChange={handleFieldChange} />
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
              onClick={handleSignUp}
              className={`btn btn-primary flex-grow py-3 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? <ButtonLoader /> : 'Sign Up'}
            </button>
            <GLoginButton />
          </div>
          <div className="mt-10">
            <p>
              {'Already have an account? '}
              <Link to="/auth" className="text-lightColor font-bold">
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

/**
 * A function to get the current location of the user.
 * @param {function} setData
 */
const getLocation = (setData, data) => {
  function success(pos) {
    const crd = pos.coords;
    console.info('Your current position is:');
    console.info(`Latitude : ${crd.latitude}`);
    console.info(`Longitude: ${crd.longitude}`);

    setData({ ...data, latitude: crd.latitude, longitude: crd.longitude });
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  if (navigator.geolocation) {
    navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition(success, errors, options);
      } else if (result.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(success, errors, options);
      } else if (result.state === 'denied') {
        toast.error('Please grant the location permission to continue');
      }
    });
  } else {
    console.warn('Geolocation is not supported by this browser.');
  }
};
