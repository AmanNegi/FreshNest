import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="text-gray-600 border-t-[1px] body-font">
      <div className="container px-5 py-10 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="flex justify-center items-center">
          <img className="h-[200px] w-[200px]" src={logo} alt="" />
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="font-semibold text-xl title-font text-gray-900 tracking-widest mb-3">
              LINKS
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a href="/home" className="text-gray-600 hover:text-black">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-800">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-800">
                  About
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Contact</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="font-semibold text-xl title-font text-gray-900 tracking-widest  mb-3">
              CATEGORIES 
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Vegetables</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Grains</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Fruits</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Specials</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="font-semibold text-xl title-font text-gray-900 tracking-widest  mb-3">
              SOCIALS 
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Twitter</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Instagram</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">LinkedIn</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Youtube</a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2023 FreshNest
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
