import NavBar from "../../../components/NavBar";
import { useEffect, useState } from "react";
import getAll from "../application/shop";
import { useNavigate } from "react-router-dom";
import ShopItem from "../../../components/ShopItem";

function Shop() {
  var [list, setList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <section className="w-[100%] mt-[8vh] bg-white min-h-screen">
        <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-8 lg:p-10 ">
          {list.map((e, i) => {
            return <ShopItem key={i} item={e} />;
          })}
        </div>
      </section>
    </>
  );
}

export default Shop;
