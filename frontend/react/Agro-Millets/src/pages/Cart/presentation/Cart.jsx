import { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import ShopItem from "../../../components/ShopItem";
import appState from "../../../data/AppState";
import getCart from "../application/cart";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCart().then((e) => {
      if (e) setCartItems(e);
      console.log("Set List to ", e);
    });

    return () => {};
  }, []);

  return (
    <>
      <NavBar />
      <section className="h-screen mt-[8vh] flex flex-col bg-accentColor bg-opacity-10">
        <h1 className="text-5xl font-bold mt-5 pl-5 md:pl-10">Your Cart</h1>
        <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-8 lg:p-10 ">
          {cartItems.map((e, i) => {
            return <ShopItem key={i} itemId={e.item} isCart={true} />;
          })}
        </div>
      </section>
    </>
  );
}

export default CartPage;
