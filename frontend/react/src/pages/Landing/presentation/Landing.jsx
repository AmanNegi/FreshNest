import landing_bg from "../../../assets/landing_bg.jpg";
import explore_image from "../../../assets/explore.png";

import Button from "../../../components/Button";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";

import { data, features } from "../../../data/data";
import { getFourItems } from "../../shop/application/shop";
import { Item } from "../../shop/application/shop_model";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

      <NavBar />
      <main className="mt-[8vh] w-[100%] overflow-hidden snap snap-y snap-mandatory">
        <TopSection />
        <OurMottoSection />
        <section className="mx-8 md:mx-28 ">
          <div className=" flex flex-col md:flex-row  ">
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 1 }}
              viewport={{ once: true }}
              className="w-[100%] p-5 md:w-[30%] my-5 flex flex-col justify-center items-center bg-green-300 rounded-lg"
            >
              <h1 className="text-4xl font-bold text-green-900">
                Our Features
              </h1>
            </motion.div>
            <div className="w-[100%] md:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-4 md:m-5">
              {features.map((e, i) => {
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.05 }}
                  >
                    <motion.div
                      transition={{ delay: 0.25, duration: 1 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      key={i}
                      className="group p-8  bg-green-200 h-[100%] w-[100%] flex flex-col justify-evenly rounded-lg"
                    >
                      <div className="bg-green-400 rounded-full h-[75px] w-[75px] flex justify-center items-center text-white text-2xl">
                        {e.icon}
                      </div>

                      <h1 className="text-2xl font-bold  ">{e.title}</h1>
                      <p className="text-black text-opacity-50">
                        {e.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        <OurGallerySection />
        <ExploreProducts />
        <section
          className="bg-cover bg-right bg-fixed relative"
          style={{
            backgroundImage: `url(${landing_bg})`,
          }}
        >
          <div className="overlay absolute inset-0 bg-black opacity-50"></div>

          <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-8 relative">
              Help us with our mission.
              <br />
              Check out now
            </h2>
            <Button text="Shop Now" path="/shop" />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

function TopSection() {
  return (
    <section
      className="relative h-[92vh] w-[100%] bg-slate-200 bg-cover bg-right bg-fixed"
      style={{ backgroundImage: `url(${landing_bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#00000065] to-[#000000ac]"></div>

      <div className="absolute top-[15vh] md:top-[25vh] left-2 md:left-5 bg-opacity-50 p-10 ">
        <motion.h1
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="font-bold tracking-wide spacing text-5xl text-white"
        >
          Fresh & Natural
          <br />
          Local Products
        </motion.h1>
        <motion.h3
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="text-md text-white mt-5"
        >
          Support Local Farmers and Get Fresh, High-Quality Products
        </motion.h3>

        <motion.div
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex gap-4 mt-5"
        >
          <Button text="Learn More" path="/about" />
          <Button text="Explore Products" path="/shop" />
        </motion.div>
      </div>
    </section>
  );
}

function OurMottoSection() {
  return (
    <motion.section
      transition={{ duration: 1.25 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className=""
    >
      <div className=" my-2 md:my-10 mx-2 md:mx-5 p-2 md:p-10 border-dotted border-[2px] border-slate-200">
        <h1 className="pt-4 text-4xl font-bold text-center">Our Motto</h1>
        <div className="flex flex-col md:flex-row lg:flex-row p-3 md:p-8 gap-2 md:gap-10 lg:gap-10">
          {data.map((e) => {
            return (
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                key={e.name}
                className="group flex flex-row  flex-1 border-[2px] border-slate-200 p-[8px] rounded-lg text-center mb-1  hover:bg-green-500 hover:text-white hover:border-white hover:border-opacity-20"
              >
                <div className="flex flex-1 border-dashed  justify-center items-center border-[2px] border-slate-200 px-3 py-2 rounded-lg hover:border-white hover:border-opacity-30">
                  <div className="text-3xl pr-2 text-green-400 group-hover:text-white">
                    {e.icon}
                  </div>

                  <p className="text-lg">{e.name}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function ExploreProducts() {
  /**
   * @type {[Array<Item>, (e:Array<Item>)=>void]}
   */
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getFourItems().then((e) => {
      setProducts(e);
      console.log("Set List to ", e);
    });
  }, []);

  return (
    <section>
      <div>
        <div className=" flex flex-col  md:flex-row lg:flex-row justify-center my-10 mx:10 md:mx-28">
          <motion.img
            transition={{ duration: 1 }}
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="w-[100%] mb-8 md:mb-0  md:w-[40%] object-cover"
            src={explore_image}
            alt=""
          />
          <motion.div
            transition={{ duration: 0.5 }}
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="w-[100%] md:w-[60%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5"
          >
            {products.map((e, i) => {
              return (
                <div
                  key={i}
                  className="flex h-[35vh] flex-col items-center justify-center"
                >
                  <div className="group h-[75%] w-[75%] relative">
                    <img
                      key={e.images[0]}
                      className="bg-slate-200 h-[100%] w-[100%] object-contain p-2 group-hover:opacity-20 transition-all"
                      src={e.images[0]}
                      alt=""
                    />

                    <div className="bg-black m-2 bg-opacity-10 hidden group-hover:flex transition-all justify-center items-center absolute inset-0 rounded-md ">
                      <button
                        onClick={() => navigate(`/item/${e._id}`)}
                        className="bg-green-500 text-white px-5 py-[2vh] rounded-md transition-all"
                      >
                        VIEW DETAILS
                      </button>
                    </div>
                  </div>
                  <div className="flex-1"></div>
                  <h1 className="text-lg">{e.name}</h1>
                  <h2 className="font-bold">₹ {e.price}</h2>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OurGallerySection() {
  return (
    <section className="border-t-[1px] border-green-200 border-dashed text-gray-800 mt-10">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-2">
          <h1 className="text-3xl lg:text-4xl font-bold ">Our Gallery</h1>
        </div>
        <div className="flex flex-wrap ">
          {[1, 2, 3, 4, 5, 6].map((e, i) => {
            return (
              <div key={i} className="lg:w-1/3 sm:w-1/2 p-4">
                <motion.img
                  whileHover={{ scale: 1.05, className: "shadow-lg" }}
                  alt="gallery"
                  className=" w-full h-full object-cover object-center"
                  src={`./gallery/${e}.jpg`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Home;
