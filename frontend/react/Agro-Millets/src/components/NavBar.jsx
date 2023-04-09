import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";
import authManager from "../data/AuthRepository";

function NavBar({ title = "Agro-Millets" }) {
  var navigate = useNavigate();
  return (
    <>
      <section className="fixed left-0 right-0 top-0 z-[1] h-[8vh] w-[100%] bg-darkColor flex flex-row items-center px-2">
        <img
          onClick={() => {
            navigate("/home");
          }}
          src={logo}
          className="h-[6vh]"
          alt="Logo Here"
        />
        <h1 className="hidden lg:block md:block text-slate-200">
          {authManager.getUserData().name}
        </h1>

        <div className=" flex flex-row items-center justify-center flex-grow-[1] md:hidden lg:hidden ">
          <h2 className="text-center font-bold text-xl text-white">{title}</h2>
        </div>

        {/*  Search Bar */}
        <div className="hidden lg:flex lg:flex-[2]"></div>
        <input
          type="text"
          placeholder="Search"
          className="h-[6vh] w-1/2 text-white bg-semiDarkColor border-2 outline-none hidden lg:block border-semiDarkColor focus:border-lightColor focus:rounded-lg focus:outline-none px-2 transition-all "
        ></input>
        <div className="hidden md-flex md:flex-1 lg:flex lg:flex-1"></div>
        {/*  About and Profile */}
        <TopBarLink name="Shop" goTo="/shop" />
        <TopBarLink name="About" goTo="/about" />
        <TopBarLink name="Profile" goTo="/profile" />

        <i
          onClick={() => navigate("/search")}
          className="p-2 lg:hidden fa-solid text-2xl text-white fa-magnifying-glass text-opacity-60 hover:text-opacity-100"
        ></i>
        {/*  Cart */}
        <div className="">
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
