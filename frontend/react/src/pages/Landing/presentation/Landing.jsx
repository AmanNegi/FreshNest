import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import NavigationButton from '../../../components/Button';

import { data, features } from '../../../data/data';
import { getFourItems } from '../../shop/application/shop';

import exploreImage from '../../../assets/explore.webp';
import { useQuery } from '@tanstack/react-query';

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="mt-[8vh] w-[100%] overflow-hidden snap snap-y snap-mandatory">
        <TopSection />
        <OurMottoSection />
        <section className="mx-8 px-4 ">
          <div className=" flex flex-col md:flex-row  ">
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 1 }}
              viewport={{ once: true }}
              className="w-[100%] p-5 md:w-[30%] my-5 flex flex-col justify-center items-center bg-green-300 rounded-lg"
            >
              <h1 className="text-4xl font-bold text-green-900">Our Features</h1>
            </motion.div>
            <div className="w-[100%] md:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-4 md:m-5">
              {features.map((e, i) => {
                return (
                  <motion.div key={i} whileHover={{ scale: 1.05 }} transition={{ duration: 0.05 }}>
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
                      <p className="text-black text-opacity-50">{e.description}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        <ExploreProducts />
        <section
          className="bg-cover bg-right bg-fixed relative"
          style={{
            backgroundImage: `url(/landing_bg.webp)`
          }}
        >
          <div className="overlay absolute inset-0 bg-black opacity-50"></div>

          <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-8 relative">
              Help us with our mission.
              <br />
              Check out now
            </h2>
            <NavigationButton text="Shop Now" path="/shop" />
          </div>
        </section>
      </main>
    </>
  );
}

function TopSection() {
  return (
    <section
      className="relative h-[92vh] w-[100%] bg-slate-200 bg-cover bg-right bg-fixed"
      style={{
        backgroundImage: `url(/landing_bg.webp)`
      }}
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
          <NavigationButton text="Learn More" path="/about" />
          <NavigationButton text="Explore Products" path="/shop" />
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
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['explore'],
    queryFn: () => getFourItems()
  });

  if (isLoading || isError) {
    return <></>;
  }

  return (
    <section>
      <div className="flex gap-5 flex-col w-full md:flex-row justify-center my-10">
        <div className="w-full md:w-2/5">
          <motion.div
            transition={{ duration: 1 }}
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="relative object-cover text-center h-[100%]" // Adjust the height here
          >
            <img className="object-cover object-center h-full w-full" src={exploreImage} alt="" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-white font-light tracking-wider text-xl md:text-lg">EXPLORE OUR</p>
              <p className="text-white font-bold text-7xl">Products</p>
            </div>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2">
          <motion.div
            transition={{ duration: 0.5 }}
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 h-full"
          >
            {products.map((e, i) => {
              return (
                <div key={i} className="flex flex-col items-center justify-center h-full">
                  <div className="group w-[10/12] relative h-full">
                    <img
                      key={e.images[0]}
                      className="h-full w-full object-contain object-center p-8 group-hover:opacity-20 transition-all"
                      src={e.images[0]}
                      alt=""
                    />
                    <div className="bg-white bg-opacity-5 border border-gray-100 hidden group-hover:flex transition-all justify-center items-center absolute inset-0 rounded-md">
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

export default Home;
