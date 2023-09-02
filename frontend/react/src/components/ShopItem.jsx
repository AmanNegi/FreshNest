import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";
import appState from "../data/AppState";
import { addToCart, removeFromCart } from "../pages/Cart/application/cart";
import { deleteItem, getItem } from "../pages/shop/application/shop";
import Button from "./Button";

import { BsFillTrash3Fill, BsCartFill } from "react-icons/bs";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import ImageView from "./ImageView";

function ShopItem({ itemId, itemCount = 1, isCart = false }) {
  var [count, setCount] = useState(itemCount);
  var [item, setItem] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getItem(itemId).then((data) => {
      setItem(data);
      setLoading(false);
    });
  }, []);

  // If Item removed show this card
  if (!loading && !item) {
    return (
      <div
        id={_id}
        className="bg-green-100 text-green-700 text-bold text-2xl flex flex-col justify-center items-center text-center p-10 rounded-lg"
      >
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
      {item !== undefined && (
        <motion.div
          onClick={() => {
            navigate("/item/" + item._id);
          }}
          key={item._id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.25 }}
          viewport={{ once: true }}
          className="border cursor-pointer border-slate-300 relative transition duration-500 rounded-lg hover:shadow-m d bg-white "
        >
          <div className="h-40 w-[100%] relative">
            <ImageView
              _id={item._id}
              url={item.images[0]}
              shimmerClass={"max-h-40"}
              imageClass={"h-40"}
            />

            {isCart && (
              <div
                onClick={async () => {
                  await removeFromCart(itemId);
                  window.location.reload();
                }}
                className="absolute top-2 right-2 ml-2 lg:ml-4 w-[40px] h-[40px] bg-red-400 flex justify-center items-center rounded-md"
              >
                <BsFillTrash3Fill className="text-white" />
              </div>
            )}
          </div>

          <div className="px-4 py-2  rounded-lg ">
            <h1 className="text-xl font-bold text-gray-700 hover:text-gray-900 hover:cursor-pointer">
              {item.name}
            </h1>

            <p className="text-lg text-green-500 font-extrabold">
              {`₹ ` + item.price + "/kg"}
            </p>

            <div className="h-[1vh]"></div>
            <Rating
              initialRating={4.0}
              readonly={true}
              fullSymbol={<AiFillStar className="text-amber-400" />}
              emptySymbol={<AiOutlineStar className="text-gray-300" />}
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
                    <AiOutlineMinus />
                  </div>
                  <div className="flex-1 h-[100%] flex justify-center items-center text-center bg-slate-200">
                    {count}
                  </div>
                  <div
                    onClick={() => {
                      setCount((count) => count + 1);
                    }}
                    className="cursor-pointer flex-1 h-[100%] flex justify-center items-center text-center"
                  >
                    <AiOutlinePlus />
                  </div>
                </div>
              )}

              {appState.isCustomer() && !isCart && (
                <button
                  onClick={async () => {
                    await addToCart(item._id, count);
                  }}
                  className="w-[40px] h-[40px] bg-green-400 flex justify-center items-center rounded-md"
                >
                  <BsCartFill className="text-white" />
                </button>
              )}

              {!isCart && appState.isAdmin() && (
                <button
                  onClick={async () => {
                    await deleteItem(itemId);
                  }}
                  className="w-[40px] h-[40px] bg-red-400 flex justify-center items-center rounded-md"
                >
                  <BsFillTrash3Fill className="text-white" />
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
