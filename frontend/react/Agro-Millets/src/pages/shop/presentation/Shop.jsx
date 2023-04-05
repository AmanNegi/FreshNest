import NavBar from "../../../components/NavBar";
import { useEffect, useState } from "react";
import getAll from "../application/shop";
import { useNavigate } from "react-router-dom";

function Shop() {
  var [list, setList] = useState([]);
  var navigate = useNavigate();

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
        <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 lg:p-10 ">
          {list.map((e) => {
            return (
              <div
                onClick={() => navigate("/item/" + e._id)}
                key={e._id}
                className="relative transition duration-500 bg-white rounded-lg shadow-lg hover:shadow-xl "
              >
                <img
                  className="h-40 w-[100%] rounded-t-lg object-cover"
                  src={e.images[0]}
                  alt=""
                />
                <div className="px-4 py-2 bg-white rounded-lg ">
                  <h1 className="text-xl font-bold text-gray-700 hover:text-gray-900 hover:cursor-pointer">
                    {e.name}
                  </h1>
                  <p className="overflow-hidden text-sm text-gray-700 h-14 text-ellipsis">
                    {e.description}
                  </p>
                  <button className="px-2 py-1 mt-3 mb-3 font-semibold text-white transition duration-300 rounded-lg shadow-md text-md bg-accentColor hover:shadow-lg">
                    Buy Now
                  </button>
                </div>
                <div className="absolute px-4 py-2 bg-white rounded-lg shadow-lg top-2 right-2">
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
