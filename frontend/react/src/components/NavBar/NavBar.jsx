import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import appState from '../../data/AppState';
import cartEmitter, { getCartCount } from '../../pages/Cart/application/cart_event';

import logo from '../../assets/logo.png';

import { Search, User, ShoppingCart, LucideShoppingBag, Menu } from 'lucide-react';

import PropTypes from 'prop-types';

function NavBar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 z-[2] h-[8vh] w-[100%] bg-white  flex px-2 md lg:px-10  items-center shadow-md "
      >
        <Link to={'/shop'}>
          <img className="h-[5rem] w-[5rem] py-3 object-contain" src={logo} alt="" />
        </Link>
        <div className="flex flex-1"></div>

        {/* Desktop Icons */}
        <div className="">
          <Search onClick={() => navigate('/search')} className="cursor-pointer mx-5" />
        </div>

        <div className="hidden md:flex">
          <LucideShoppingBag
            onClick={() => navigate('/shop')}
            className="cursor-pointer mx-5 text-xl"
          />
        </div>

        <div className="hidden md:flex">
          <User onClick={() => navigate('/profile')} className="cursor-pointer mx-5 text-xl" />
        </div>

        <CartNotifier />

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1">
            <Menu />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow-md bg-base-100 rounded-box w-52"
          >
            <NavBarItem text="Home" route="/home" />
            <NavBarItem text="Shop" route="/shop" />
            <NavBarItem text="About" route="/about" />
            <li
              onClick={() => {
                appState.logOutUser();
                queryClient.removeQueries(['profile']);
                queryClient.removeQueries(['cart']);
                queryClient.removeQueries(['explore']);
                queryClient.removeQueries(['items']);

                navigate('/auth');
              }}
            >
              <h6>Logout</h6>
            </li>
          </ul>
        </div>
      </motion.header>
    </>
  );
}

function NavBarItem({ text = 'NavItem', route = '/' }) {
  const navigate = useNavigate();
  return (
    <li onClick={() => navigate(route)}>
      <h6>{text}</h6>
    </li>
  );
}

NavBarItem.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired
};

const CartNotifier = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  if (!appState.isCustomer()) return;

  useEffect(() => {
    console.info('NavBar.jsx: Adding Listener...');
    setCartCount(getCartCount());

    const listener = (count) => {
      console.info('Cart Counter notified: ', count);
      setCartCount(count);
    };

    cartEmitter.on('cartUpdate', listener);

    return () => {
      console.info('NavBar.jsx: Removing Listener...');
      cartEmitter.off('cartUpdate', listener);
    };
  }, []);

  return (
    <div className=" flex mr-5 relative" onClick={() => navigate('/cart')}>
      <ShoppingCart className="cursor-pointer text-xl ml-5" />
      {cartCount > 0 && (
        <span className="animate-bounce bg-red-600 text-white rounded-full w-[17px] h-[17px] text-center text-[12px] absolute right-[-10px] top-[-10px]">
          <div className="text-center">{cartCount}</div>
        </span>
      )}
    </div>
  );
};

export default NavBar;
