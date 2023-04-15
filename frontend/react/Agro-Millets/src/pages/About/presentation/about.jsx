import NavBar from "../../../components/NavBar";
import about_img from "../../../assets/about_img.jpg";
import about_img_2 from "../../../assets/about_img_2.jpg";
import about_img_3 from "../../../assets/about_img_3.jpg";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import { useEffect } from "react";

var problemStatement =
  "The agricultural industry is facing a decline as farmers struggle with low pay, leading to a decrease in the cultivation of diverse crops. Many farmers are opting to grow only government-subsidized crops or switching to other jobs altogether. This trend has led to a loss of locally grown natural grains and vegetables, which has reduced the diversity of the food supply. As a result, the country is becoming increasingly dependent on imported harvests from other nations.";

var solutionStatement =
  "Agro-Millets is a website that helps farmers connect directly with consumers who are interested in buying locally grown produce. This platform enables farmers to set their prices, which gives them more control over their income and eliminates the need to travel long distances to markets. By facilitating direct connections between farmers and consumers, Local Harvests can increase the diversity of the food supply, improve market access issues faced by farmers, and improve the livelihoods of farmers.";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar />

      <main className="mt-[8vh]">
        <section className=" flex flex-col-reverse md:flex-row ">
          <div className="flex flex-col w-[100%] md:w-[50%] justify-center px-5 md:px-20 md:py-20">
            <h1 className=" text-3xl md:text-5xl font-bold mb-5 mt-8 md:mt-0 tracking-tight text-green-900 ">
              The Problem
            </h1>
            <p className="leading-relaxed text-semiDarkColor">
              {problemStatement}
            </p>
          </div>
          <motion.img
            initial={{ x: 250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-[100%] md:w-[50%] object-cover"
            src={about_img}
            alt=""
          />
        </section>
      </main>

      <main className="mt-[8vh] mb-5">
        <section className=" flex flex-col md:flex-row">
          <div className="w-[100%] md:w-[50%] object-cover relative">
            <motion.img
              initial={{ x: -250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-[100%] object-cover"
              src={about_img_2}
              alt=""
            />
          </div>

          <div className="flex flex-col w-[100%] md:w-[50%] justify-center px-5 md:px-20">
            <h1 className=" text-3xl md:text-5xl font-bold mb-5 mt-8 md:mt-0 tracking-wide text-green-900">
              The Solution
            </h1>
            <p className="leading-relaxed text-semiDarkColor">
              {solutionStatement}
            </p>
          </div>
        </section>
      </main>

      <section
        className="bg-cover bg-right bg-fixed relative"
        style={{
          backgroundImage: `url(${about_img_3})`,
        }}
      >
        <div className="overlay absolute inset-0 bg-black opacity-50"></div>

        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-8 relative ">
            <h1 className="mb-10"> Supporting</h1>
            आत्मनिर्भर भारत
          </h2>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
