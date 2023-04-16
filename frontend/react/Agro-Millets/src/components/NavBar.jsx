// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/icon.png";
// import authManager from "../data/AuthRepository";

// function NavBar({ title = "Agro-Millets" }) {
//   var navigate = useNavigate();
//   return (
//     <>
//       <section className="fixed left-0 right-0 top-0 z-[1] h-[8vh] w-[100%] bg-darkColor flex flex-row items-center px-2">
//         <img
//           onClick={() => {
//             navigate("/home");
//           }}
//           src={logo}
//           className="h-[6vh]"
//           alt="Logo Here"
//         />
//         <h1 className="hidden lg:block md:block text-slate-200">
//           {authManager.getUserData().name}
//         </h1>

//         <div className=" flex flex-row items-center justify-center flex-grow-[1] md:hidden lg:hidden ">
//           <h2 className="text-center font-bold text-xl text-white">{title}</h2>
//         </div>

//         {/*  Search Bar */}
//         <div className="hidden lg:flex lg:flex-[2]"></div>
//         <input
//           type="text"
//           placeholder="Search"
//           className="h-[6vh] w-1/2 text-white bg-semiDarkColor border-2 outline-none hidden lg:block border-semiDarkColor focus:border-lightColor focus:rounded-lg focus:outline-none px-2 transition-all "
//         ></input>
//         <div className="hidden md-flex md:flex-1 lg:flex lg:flex-1"></div>
//         {/*  About and Profile */}
//         <TopBarLink name="Shop" goTo="/shop" />
//         <TopBarLink name="About" goTo="/about" />
//         <TopBarLink name="Profile" goTo="/profile" />

//         <i
//           onClick={() => navigate("/search")}
//           className="p-2 lg:hidden fa-solid text-2xl text-white fa-magnifying-glass text-opacity-60 hover:text-opacity-100"
//         ></i>
//         {/*  Cart */}
//         <div className="">
//           <i className="p-4 text-2xl text-white fas fa-shopping-cart opacity-60 hover:opacity-100"></i>
//         </div>
//       </section>
//     </>
//   );
// }

// function TopBarLink({ name, goTo }) {
//   return (
//     <Link to={goTo}>
//       <p className="hidden p-4 text-white lg:block md:block hover:opacity-100 opacity-60">
//         {name}
//       </p>
//     </Link>
//   );
// }

// export default NavBar;
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { useState } from "react";

function NavBar() {
  const [drawerVisible, setdrawerVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        // whileInView={{ y: 0 }}
        className="fixed top-0 z-[2] h-[8vh] w-[100%] bg-white  flex px-2 md lg:px-10  items-center shadow-md "
      >
        {/* <h1>LOGO</h1> */}
        <img className="h-20  py-2 object-contain" src={logo} alt="" />
        <div className="flex flex-1"></div>

        <NavBarItem text="Home" route="/home" />
        <NavBarItem text="About" route="/about" />
        <NavBarItem text="Shop" route="/shop" />
        <i
          onClick={() => navigate("/search")}
          className="cursor-pointer p-2 mx-5 lg:hidden fa-solid text-2xl fa-magnifying-glass hover:bg-green-100 "
        ></i>
        <i
          onClick={() => navigate("/profile")}
          className="cursor-pointer p-2 mx-5 lg:hidden fa-solid text-2xl fa-user hover:bg-green-100  "
        ></i>
 <i
          onClick={() => navigate("/cart")}
          className="cursor-pointer p-2 mx-5 lg:hidden fa-solid text-2xl fa-cart-shopping hover:bg-green-100  "
        ></i>
        {/* <Button additionalClasses="hidden md:block" text="Contact" /> */}

        <div
          onClick={() => {
            setdrawerVisible(!drawerVisible);
          }}
          className="visible md:hidden mr-2 h-[100%] w-[20%] flex justify-end items-center"
        >
          <i
            className={`fa-solid ${!drawerVisible ? "fa-bars" : "fa-close"} `}
          ></i>
        </div>
      </motion.header>
      {drawerVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed top-[8vh] z-[1] visible md:hidden w-[100%] flex flex-col"
        >
          <MobileNavBarItem text="Home" route="/" />
          <MobileNavBarItem text="Shop" route="/shop" />
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
      className="hidden lg:flex md:flex items-center text-center h-[100%] px-5 mx-5 hover:bg-green-100 hover:text-green-800 "
    >
      <h1 className="text-lg ">{text}</h1>
    </div>
  );
}

export default NavBar;
