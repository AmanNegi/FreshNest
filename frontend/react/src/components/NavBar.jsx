import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import appState from "../data/AppState";
import cartEmitter, {
  getCartCount,
} from "../pages/Cart/application/cart_event";

// ICONS
import { BsSearch } from "react-icons/bs";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

function NavBar() {
  const [drawerVisible, setdrawerVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 z-[2] h-[8vh] w-[100%] bg-white  flex px-2 md lg:px-10  items-center shadow-md "
      >
        <img className="h-20  py-2 object-contain" src={logo} alt="" />
        <div className="flex flex-1"></div>

        <NavBarItem text="Home" route="/home" />
        <NavBarItem text="About" route="/about" />
        <NavBarItem text="Shop" route="/shop" />

        {/* Desktop Icons */}
        <div className="hidden md:flex">
          <BsSearch
            onClick={() => navigate("/search")}
            className="cursor-pointer mx-5"
          />
        </div>

        <div className="hidden md:flex">
          <AiOutlineUser
            onClick={() => navigate("/profile")}
            className="cursor-pointer mx-5 text-xl"
          />
        </div>

        <CartNotifier />

        {/* ! Mobile Layout */}

        <div
          onClick={() => {
            setdrawerVisible(!drawerVisible);
          }}
          className="visible md:hidden mr-2 h-[100%] w-[20%] flex justify-end items-center"
        >
          {drawerVisible && <GrClose />}
          {!drawerVisible && <FaBars />}
        </div>
      </motion.header>
      {drawerVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed top-[8vh] z-[1] visible md:hidden w-[100%] flex flex-col"
        >
          <MobileNavBarItem text="Home" route="/home" />
          <MobileNavBarItem text="Shop" route="/shop" />
          <MobileNavBarItem text="Search" route="/search" />
          <MobileNavBarItem text="Profile" route="/profile" />
          {appState.isCustomer() && (
            <MobileNavBarItem text="Cart" route="/cart" />
          )}
          <MobileNavBarItem text="About" route="/about" />
        </motion.div>
      )}
    </>
  );
}

function MobileNavBarItem({ text = "NavItem", route = "/" }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(route);
      }}
      className="bg-green-100 py-3 px-2 border-b border-green-200"
    >
      <h1 className="text-green-800">{text}</h1>
    </div>
  );
}

function NavBarItem({ text = "NavItem", route = "/" }) {
  var navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(route)}
      className="hidden lg:flex md:flex items-center text-center h-[100%] px-5  hover:bg-green-100 hover:text-green-800 "
    >
      <h1 className="text-lg ">{text}</h1>
    </div>
  );
}

const MobileNavBar = () => {
  return <div>MobileNavBar</div>;
};

const CartNotifier = () => {
  const navigate = useNavigate();
  let [cartCount, setCartCount] = useState(0);
  if (!appState.isCustomer()) return;

  useEffect(() => {
    console.log("Adding Listener...");
    setCartCount(getCartCount());

    const listener = (count) => {
      console.log("Cart Counter notified: ", count);
      setCartCount(count);
    };

    cartEmitter.on("cartUpdate", listener);

    return () => {
      cartEmitter.off("cartUpdate", listener);
    };
  });

  return (
    <div className="hidden md:flex relative" onClick={() => navigate("/cart")}>
      <AiOutlineShoppingCart className="cursor-pointer text-xl ml-5" />
      {cartCount > 0 && (
        <span className="bg-red-600 text-white rounded-full w-[17px] h-[17px] text-center text-[12px] absolute right-[-10px] top-[-10px]">
          <div className="text-center">{cartCount}</div>
        </span>
      )}
    </div>
  );
};

export default NavBar;
