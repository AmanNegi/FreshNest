import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";
import appState from "../data/AppState";
import { addToCart, removeFromCart } from "../pages/Cart/application/cart";
import { deleteItem, getItem } from "../pages/shop/application/shop";
import TimeAgo from "react-timeago";
import enStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const formatter = buildFormatter(enStrings);

import { BsFillTrash3Fill, BsCartFill } from "react-icons/bs";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import ImageView from "./ImageView";

/**
 *
 * @param {Object} props
 * @param {string} props.itemId
 * @param {number} props.itemCount
 * @param {boolean} props.isCart
 * @param {function(Item): void} props.onDelete
 * @returns
 */
function ShopItem({ itemId, itemCount = 1, isCart = false, onDelete }) {
  /** @type {[number, function]}*/
  const [count, setCount] = useState(itemCount);

  /** @type {[Item, function]}*/
  const [item, setItem] = useState(undefined);

  /** @type {[boolean , function]} */
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getItem(itemId).then((data) => {
      console.log("ItemData: ", data);
      setItem(data);
      setLoading(false);
    });
  }, []);

  // If Item removed show this card
  if (!loading && !item) {
    return (
      <div
        id={itemId}
        className="bg-red-100 text-bold text-2xl flex flex-col justify-center items-center text-center p-10 rounded-lg"
      >
        <h1>Item has been removed by admin</h1>
        <div className="h-4"></div>
        <button
          className="btn btn-error"
          onClick={async (e) => {
            e.stopPropagation();
            await removeFromCart(itemId);
            if (onDelete) onDelete();
          }}
        >
          Remove From Cart
        </button>
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
          className="border cursor-pointer border-slate-300 relative transition duration-500 rounded-lg hover:shadow-md bg-white "
        >
          <div className="h-40 w-[100%] relative">
            <ImageView
              _id={item._id}
              url={item.images[0]}
              shimmerClass={"max-h-40"}
              imageClass={"h-40"}
            />
            {!isCart && (
              <div className="absolute top-0 right-0 text-white shadow-lg bg-accentColor  text-sm rounded-bl-md rounded-tr-md px-4 py-2">
                <TimeAgo date={item.listedAt} formatter={formatter} />
              </div>
            )}

            {isCart && (
              <div
                onClick={async (e) => {
                  e.stopPropagation();
                  removeFromCart(itemId);
                  window.location.reload();
                }}
                className="absolute top-2 right-2 ml-2 lg:ml-4 w-[40px] h-[40px] flex justify-center items-center rounded-md bg-red-400"
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
            <div className="flex flex-row gap-2 items-center">
              {appState.isCustomer() && (
                <div className="w-[50%] h-[40px] flex flex-row items-center justify-center border border-gray-300 rounded-md px-2">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
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
                    onClick={(e) => {
                      e.stopPropagation();
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
                  onClick={async (e) => {
                    e.stopPropagation();
                    await addToCart(item._id, count);
                  }}
                  className="btn btn-accent"
                >
                  <BsCartFill className="text-white" />
                </button>
              )}

              {!isCart &&
                (appState.isAdmin() || appState.isOwner(item.listedBy)) && (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      await deleteItem(itemId, item.listedBy);
                      if (onDelete) {
                        onDelete(item);
                      }
                    }}
                    className="btn btn-error"
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
