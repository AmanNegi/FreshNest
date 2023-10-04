import { useEffect, useState } from "react";

import NavBar from "../../../components/NavBar";
import ShopItem from "../../../components/ShopItem";
import Footer from "../../../components/Footer";
import ShimmerShopItem from "../../../components/ShimmerShopItem";
import { CartItem } from "../../../modals/cart";

import getCart from "../application/cart";

function CartPage() {
  /**
   * @type {[CartItem[], function]}
   */
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCart().then((e) => {
      setIsLoading(false);
      if (e) setCartItems(e);
      console.log("Set List to ", e);
    });

    return () => { };
  }, []);

  return (
    <>
      <NavBar />
      {isLoading && (
        <section className="md:min-h-screen mt-[8vh] flex flex-col">
          <h1 className="mt-5 pl-5 md:pl-10">Your Cart</h1>
          <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-8 lg:p-10 ">
            {[1, 2, 3, 4, 5].map((e) => {
              return <ShimmerShopItem key={e} id={e} />;
            })}
          </div>
          <div className="h-[10vh]"></div>
        </section>
      )}

      {!isLoading && (
        <section className="min-h-screen mt-[8vh] flex flex-col">
          <h1 className="mt-5 pl-5 md:pl-10">Your Cart</h1>
          {cartItems.length === 0 && (
            <div className="h-[75vh] w-[100%] flex flex-col gap-10 justify-center items-center">
              <h1 className="text-8xl">🍉</h1>
              <h2> No Items in cart  </h2>
            </div>
          )} <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-8 lg:p-10 ">

            {cartItems.map((e, i) => {
              return (
                <ShopItem
                  key={i}
                  itemId={e.item}
                  itemCount={e.count}
                  isCart={true}
                />
              );
            })}
          </div>
          <div className="h-[10vh]"></div>
        </section>
      )}
      <Footer />
    </>
  );
}

export default CartPage;
