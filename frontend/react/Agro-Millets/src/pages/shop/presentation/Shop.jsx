import NavBar from "../../../components/NavBar";
import farm from "../../../assets/farm.jpg";
import { useEffect, useState } from "react";
import getAll from "../application/shop";

function Shop() {
  var [list, setList] = useState([]);

  useEffect(() => {
    getAll().then((e) => {
      setList(e);
      console.log("Set List to ", e);
    });

    return () => {
      // Clean up here
    };
  }, []);

  return (
    <>
      <NavBar />
      <section className="w-[100%] mt-[8vh] bg-gray-100 min-h-screen">
        <div className=" w-[100%] grid grid-cols-4 gap-x-4 gap-y-10 p-10 ">
          {list.map((e) => {
            return (
              <div
                key={e._id}
                className="h-[35vh] max-w-[31vw] bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg"
              >
                <img
                  className="h-[50%] w-[100%] rounded-t-lg object-cover"
                  src={e.images[0]}
                  alt=""
                />
                <div className="py-2 px-4 rounded-lg bg-white ">
                  <h1 className="text-gray-700 font-bold text-xl  hover:text-gray-900 hover:cursor-pointer">
                    {e.name}
                  </h1>
                  <p className="h-[5vh] text-ellipsis overflow-clip text-gray-700 text-sm">
                    {e.description}
                  </p>
                  <button className="mt-3 mb-3 py-1 px-2 text-md bg-accentColor text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    Buy Now
                  </button>
                </div>
                <div className="absolute top-2 right-2 py-2 px-4 bg-white rounded-lg shadow-lg">
                  <span className="text-md">{"₹ " + e.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Shop;
