import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";
import appState from "../data/AppState";
import { addToCart, removeFromCart } from "../pages/Cart/application/cart";
import { deleteItem, getItem } from "../pages/shop/application/shop";
import Button from "./Button";

function ShopItem({ itemId, isCart = false }) {
  var [count, setCount] = useState(1);
  var [item, setItem] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItem(itemId).then((data) => {
      setItem(data);
      setLoading(false);
    });
  }, []);

  var navigate = useNavigate();

  console.log(loading, item);

  // If Item removed show this card
  if (!loading && !item) {
    return (
      <div className="bg-green-100 text-green-700 text-bold text-2xl flex flex-col justify-center items-center text-center p-10 rounded-lg">
        <h1>Item has been removed by admin</h1>
        <div className="h-2"></div>
        <Button
          onClick={async () => {
            await removeFromCart(itemId);
          }}
          text="Remove Item"
        />
      </div>
    );
  }

  return (
    <>
      {item && (
        <motion.div
          key={item._id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.25 }}
          viewport={{ once: true }}
          className="border border-slate-300 relative transition duration-500 rounded-lg hover:shadow-m d bg-white "
        >
          <div className="h-40 w-[100%] relative">
            <img
              onClick={() => navigate("/item/" + item._id)}
              className="h-40 w-[100%] rounded-t-lg object-cover"
              src={item.images[0]}
              alt=""
            />
            {isCart && (
              <div
                onClick={async () => {
                  await removeFromCart(itemId);
                  window.location.reload();
                }}
                className="absolute top-2 right-2 ml-2 lg:ml-4 w-[40px] h-[40px] bg-red-400 flex justify-center items-center rounded-md"
              >
                <i className="fa-solid fa-trash text-white"></i>
              </div>
            )}
          </div>

          <div className="px-4 py-2  rounded-lg ">
            <h1 className="text-xl font-bold text-gray-700 hover:text-gray-900 hover:cursor-pointer">
              {item.name}
            </h1>

            <p className="text-lg text-green-500 font-bold">
              {`₹ ` + item.price + "/kg"}
            </p>

            <div className="h-[1vh]"></div>
            <Rating
              initialRating={4.0}
              readonly={true}
              fullSymbol="fa-solid fa-star text-amber-400 "
              emptySymbol="fa-regular fa-star text-gray-300"
            />
            {/* <RatingComponent /> */}

            <div className="h-[1vh]"></div>
            <div className="flex flex-row gap-2">
              {appState.isCustomer() && (
                <div className="w-[50%] h-[40px] flex flex-row items-center justify-center border border-gray-300 rounded-md px-2">
                  <div
                    onClick={() => {
                      if (count > 0) {
                        setCount((count) => {
                          return count - 1;
                        });
                      }
                    }}
                    className="cursor-pointer flex-1 h-[100%] flex justify-center items-center"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </div>
                  <div className="flex-1 h-[100%] flex justify-center items-center text-center bg-slate-200">
                    {count}
                  </div>
                  <div
                    onClick={() => {
                      setCount((count) => count + 1);
                      console.log(count);
                    }}
                    className="cursor-pointer flex-1 h-[100%] flex justify-center items-center text-center"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </div>
              )}

              {appState.isCustomer() && (
                <button
                  onClick={async () => {
                    await addToCart(item._id, count);
                  }}
                  className="w-[40px] h-[40px] bg-green-400 flex justify-center items-center rounded-md"
                >
                  <i className="fa-solid fa-cart-shopping text-white"></i>
                </button>
              )}

              {!isCart && appState.isAdmin() && (
                <button
                  onClick={async () => {
                    await deleteItem(itemId);
                  }}
                  className="w-[40px] h-[40px] bg-red-400 flex justify-center items-center rounded-md"
                >
                  <i className="fa-solid fa-trash text-white"></i>
                </button>
              )}
            </div>
          </div>
          <div className="h-[1vh]"></div>
        </motion.div>
      )}
    </>
  );
}

export default ShopItem;
