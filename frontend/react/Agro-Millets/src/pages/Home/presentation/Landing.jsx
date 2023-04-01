import farm from "../../../assets/farm.jpg";

function Landing() {
  return (
    <>
           <section className="h-[100vh]  relative bg-yellow-500">
        <img
          src={farm}
          alt=""
          className="absolute left-0 right-0 top-0 max-h-[100vh] w-[100%] bg-cover "
        />

        <div className="absolute inset-0 from-transparent to-black bg-gradient-to-br "></div>
        <div className="absolute right-[2%] bottom-[5%] flex max-w-[30%] flex-col items-end">
          <h1 className="text-white text-2xl font-bold text-right">
            Welcome to Agro Millets
          </h1>

          <p className="text-body text-white opacity-70 font-light text-right">
            Connecting Farmers and Customers for Direct, Sustainable, and
            Affordable Grain and Millet Transactions{" "}
          </p>
          <div className="h-2"></div>
          <button
            className="bg-accentColor text-white rounded-md px-5 py-2"
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
