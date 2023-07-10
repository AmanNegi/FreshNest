import NavBar from "../../../components/NavBar";
import { useEffect, useState } from "react";
import ShopItem from "../../../components/ShopItem";
import appState from "../../../data/AppState";
import getItems from "../application/shop";

import { FaCaretDown } from "react-icons/fa";
import Button from "../../../components/Button";

function Shop() {
  var [list, setList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getItems("2").then((e) => {
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
      <div className="mt-[8vh] px-10 pt-[4vh] pb-[3vh] flex flex-row ">
        <h1 className="text-3xl font-semibold mr-auto">{getShopHeading()}</h1>

        {list.length > 0 && <Filter updateFilter={updateFilter} />}
        <Button path="/add" text="Add Item" additionalClasses="ml-2" />
      </div>
      <section className="w-[100%] bg-white min-h-screen">
        <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-8 lg:px-10 mb-8">
          {list.map((e, i) => {
            return <ShopItem key={i} itemId={e._id} isCart={false} />;
          })}
        </div>
      </section>
    </>
  );

  async function updateFilter(value) {
    setList([]);
    setList(await getItems(value));
  }
}

function getShopHeading() {
  if (appState.isFarmer()) return "Your Products";
  else if (appState.isAdmin()) return "All Products";

  return "Explore Products";
}

const Filter = ({ updateFilter }) => {
  const options = [
    { value: "0", label: "Latest" },
    { value: "1", label: "Oldest" },
    { value: "2", label: "A-Z" },
    { value: "3", label: "Z-A" },
    { value: "4", label: "Price: Low to High" },
    { value: "5", label: "Price: High to Low" },
  ];
  return (
    <>
      <div className="hidden md:flex w-[20vw] relative">
        <FaCaretDown className="absolute right-4 top-3" />
        <select
          className="w-[20vw] border border-darkColor rounded-lg  py-2 px-2"
          onChange={(v) => {
            console.log("Changed to", v.target.value);
            updateFilter(v.target.value);
          }}
        >
          {options.map((e, i) => {
            return (
              <option className="border-none" key={i} value={e.value}>
                {e.label}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default Shop;
