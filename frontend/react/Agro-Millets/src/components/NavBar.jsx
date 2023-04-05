import { Link } from "react-router-dom";
import logo from "../assets/icon.png";
import authManager from "../data/AuthRepository";

function NavBar() {
  console.log(authManager.getUserData());
  return (
    <>
      <section className="fixed left-0 right-0 top-0 z-[1] h-[8vh] w-[100%] bg-darkColor flex flex-row items-center px-2">
        <img src={logo} className="h-[6vh]" alt="Logo Here" />
        <h1 className="hidden lg:block md:block text-slate-200">
          {authManager.getUserData().name}
        </h1>

        <div className="flex flex-row items-center justify-center flex-grow-[10] md:hidden lg:hidden ">
          <h2 className="text-center text-white">Agro-Millets</h2>
        </div>

        {/*  Search Bar */}
        <div className="hidden lg:flex flex-[2]"></div>
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
        <div className="hidden lg:block md:block">
          <i className="p-4 text-2xl text-white fas fa-shopping-cart opacity-60 hover:opacity-100"></i>
        </div>
      </section>
    </>
  );
}

function TopBarLink({ name, goTo }) {
  return (
    <Link to={goTo}>
      <p className="hidden p-4 text-white lg:block md:block hover:opacity-100 opacity-60">
        {name}
      </p>
    </Link>
  );
}

export default NavBar;
