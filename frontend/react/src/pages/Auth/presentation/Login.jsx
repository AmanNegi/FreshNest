import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import appState from '../../../data/AppState';
import getCart from '../../Cart/application/cart';
import login from '../application/auth';
import ButtonLoader from '../../../components/ButtonLoader';
import GLoginButton from './components/GLoginButton';

import farm from '../../../assets/farm.webp';
import icon from '../../../assets/logo.png';
import PasswordField from './components/PasswordField';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email.length === 0) {
      toast.error('Enter your email to login 😥');
      return;
    }

    if (password.length === 0) {
      toast.error('Enter your password to login 😥');
      return;
    }

    setLoading(true);

    try {
      const data = await login(email, password);
      if (data.statusCode === 200) {
        await getCart();
        navigate('/home');
      }
    } catch (error) {
      setLoading(false);
      toast.error('Error while logging in');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (appState.isUserLoggedIn()) {
      navigate('/shop');
      toast('Logged in as ' + appState.getUserData().name);
    }
  }, []);

  return (
    <>
      <section className="float-right relative h-screen w-screen lg:w-[40%]">
        {/* Top Right Icon and Text */}
        <div className="absolute right-3 top-3 cursor-pointer z-[1]" onClick={() => navigate('/')}>
          <img className="h-[75px] object-contain  mr-1" src={icon} alt="" />
        </div>

        {/* Center Item  */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 max-w-lg mx-auto">
          <h1 className="text-2xl font-black">Welcome to FreshNest</h1>
          <p className="font-extralight">Please enter your details</p>
          <div className="pt-10"></div>

          {/* Email Field */}

          <div className="flex flex-col w-[100%]">
            <label htmlFor="input">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value.toLowerCase());
              }}
              type="email"
              placeholder=""
              className="input input-bordered w-full mt-2"
            />
          </div>
          <div className="pt-2"></div>
          {/* Password Field */}
          <PasswordField handleFieldChange={(e) => setPassword(e.target.value)} />
          <div className="pt-5"></div>
          {/* Button */}
          <button
            onClick={handleLogin}
            className={`btn btn-primary w-full py-3 mb-4 ${loading ? ' cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? <ButtonLoader /> : 'Login'}
          </button>
          <GLoginButton />
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
