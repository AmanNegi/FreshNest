import farm from "../../../assets/farm.jpg";

function Landing() {
  return (
    <>
      <section className="h-[100vh]  relative bg-yellow-500">
        <img
          src={farm}
          alt=""
          className="absolute h-[100%] w-[100%] bg-cover "
        />

        <div className="absolute inset-0 from-transparent to-black bg-gradient-to-br "></div>
        <div className="absolute right-[2%] bottom-[5%] flex md:max-w-[30%] lg:max-w-[30%] flex-col items-end">
          <h1 className="text-2xl font-bold text-right text-white">
            Welcome to Agro Millets
          </h1>

          <p className="font-light text-right text-white text-body opacity-70">
            Connecting Farmers and Customers for Direct, Sustainable, and
            Affordable Grain and Millet Transactions{" "}
          </p>
          <div className="h-2"></div>
          <button
            className="px-5 py-2 text-white rounded-md bg-accentColor"
            onClick={() => {
              // Go to /shop
              updateIndex(1);
            }}
          >
            Shop Now
          </button>
        </div>
      </section>
    </>
  );
}

export default Landing;
