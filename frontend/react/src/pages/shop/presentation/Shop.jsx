import { useEffect, useState } from "react";

import ShopItem from "../../../components/ShopItem";
import NavBar from "../../../components/NavBar";
import Button from "../../../components/Button";
import ShimmerShopItem from "../../../components/ShimmerShopItem";

import appState from "../../../data/AppState";
import getItems from "../application/shop";
import { sortList } from "../application/shop";

import { FaCaretDown } from "react-icons/fa";
import Footer from "../../../components/Footer";
import { Item } from "../application/shop_model";

function Shop() {
  /**
   * @type {[Item[], function]}
   */
  var [list, setList] = useState([]);
  var [isLoading, setIsLoading] = useState(true);
  var [filter, setFilter] = useState("Latest");

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    getItems("2").then((e) => {
      setIsLoading(false);
      setList(e);
      console.log("Set List to ", e);
    });

    return () => { };
  }, []);

  return (
    <>
      <NavBar />
      <div className="mt-[8vh] px-10 pt-[4vh] pb-[3vh] flex flex-col md:flex-row items-center">
        <h1 className="text-3xl font-semibold mr-auto">{getShopHeading()}</h1>
        <div className="flex flex-row items-center">
          {list.length > 0 && (
            <Filter filter={filter} updateFilter={updateFilter} />
          )}
          {appState.isFarmer() && (
            <Button path="/add" text="Add Item" additionalClasses="ml-2" />
          )}
        </div>
      </div>

      {isLoading ? (
        <section className="w-full bg-white min-h-screen px-8 lg:px-10 mb-8">
          <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-8 lg:px-10 mb-8">
            {[1, 2, 3, 4, 5].map((e) => {
              return <ShimmerShopItem key={e} id={e} />;
            })}
          </div>
        </section>
      ) : (
        <section className="w-[100%] bg-white min-h-screen">
          <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-8 lg:px-10 mb-8">
            {list.map((e, i) => {
              return <ShopItem key={e._id} itemId={e._id} isCart={false} />;
            })}
          </div>
        </section>
      )}
      <Footer />
    </>
  );

  function updateFilter(name, value) {
    setFilter(name);
    setList(prevList => sortList(prevList, value))
  }
}

function getShopHeading() {
  if (appState.isFarmer()) return "Your Products";
  else if (appState.isAdmin()) return "All Products";

  return "Explore Products";
}

const Filter = ({ filter, updateFilter }) => {
  const options = [
    { value: "0", label: "Latest" },
    { value: "1", label: "Oldest" },
    { value: "2", label: "A-Z" },
    { value: "3", label: "Z-A" },
    { value: "4", label: "Price: Low to High" },
    { value: "5", label: "Price: High to Low" },
  ];
  return (
    <details className="dropdown dropdown-bottom dropdown-end">
      <summary className="m-1 btn">
        {filter} <FaCaretDown />
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {options.map((e, i) => {
          return (
            <li key={i} onClick={() => updateFilter(e.label, e.value)}>
              <option className="border-none" key={i} value={e.value}>
                {e.label}
              </option>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default Shop;
