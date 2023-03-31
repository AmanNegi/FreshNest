import { Link } from "react-router-dom";
import logo from "../assets/icon.png";

function NavBar({}) {
  return (
    <>
      <section className="fixed left-0 right-0 top-0 z-[1] h-[8vh] w-[100%] bg-darkColor flex flex-row items-center px-2">
        <img src={logo} className="h-[6vh]" alt="Logo Here" />
        {/*  Search Bar */}
        <div className="flex flex-[2]"></div>
        <input
          type="text"
          placeholder="Search"
          className="h-[6vh] w-1/2 text-white bg-semiDarkColor border-2 outline-none hidden lg:block border-semiDarkColor focus:border-lightColor focus:rounded-lg focus:outline-none px-2 transition-all "
        ></input>
        <div className="flex flex-1"></div>
        {/*  About and Profile */}
        <TopBarLink name="Shop" goTo="/shop" />
        <TopBarLink name="About" goTo="/about" />
        <TopBarLink name="Profile" goTo="/profile" />
        {/*  Cart */}
        <i className="fas fa-shopping-cart text-2xl p-4 text-white opacity-60 hover:opacity-100"></i>
      </section>
    </>
  );
}

function TopBarLink({ name, goTo }) {
  return (
    <Link to={goTo}>
      <p className="text-white hover:opacity-100 opacity-60 p-4">{name}</p>
    </Link>
  );
}

export default NavBar;
