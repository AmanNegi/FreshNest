import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appState from '../data/AppState';
import { addToCart, removeFromCart } from '../pages/Cart/application/cart';
import { getItem, getUserFromId } from '../pages/shop/application/shop';
import TimeAgo from 'react-timeago';

import { Trash, Clock, Minus, Plus } from 'lucide-react';

import ImageView from './ImageView';
import { cn } from '../utils/cn';
import { useQuery } from '@tanstack/react-query';
import ShimmerShopItem from './ShimmerShopItem';
import { toast } from 'react-toastify';

import useShopItemMutations from '../hooks/ShopItemHook';
import PropTypes from 'prop-types';

/**
 *
 * @param {Object} props
 * @param {string} props.itemId
 * @param {number} props.itemCount
 * @param {boolean} props.isCart
 * @param {function(Item): void} props.onDelete
 * @returns {JSX.Element}
 */
function ShopItem({ itemId, itemCount = 1, isCart = false, onDelete }) {
  /** @type {[number, function]} */
  const [count, setCount] = useState(itemCount);

  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['item', itemId],
    queryFn: async () => {
      const item = await getItem(itemId);

      if (!item) throw Error('An error occured while loading item!');

      const user = await getUserFromId(item?.listedBy);

      if (!user) throw Error('An error occured while loading item!');
      return {
        item,
        user
      };
    }
  });

  const { deleteItemFromCartMutation, deleteItemMutation, updateCartMutation } =
    useShopItemMutations(itemId);

  if (isLoading) {
    return <ShimmerShopItem id={itemId} key={itemId} />;
  }

  // If Item removed show this card
  if (isError) {
    return (
      <div
        id={itemId}
        className="flex flex-col items-center justify-center p-10 text-2xl text-center bg-red-100 rounded-lg text-bold"
      >
        <h1>{error.message}</h1>
        <div className="h-4"></div>
        <button
          className="btn btn-error"
          onClick={async (e) => {
            if (isCart) {
              e.stopPropagation();
              await removeFromCart(itemId);
              if (onDelete) onDelete();
            } else {
              toast.error('An unforseeable error occured!');
            }
          }}
        >
          Remove From Cart
        </button>
      </div>
    );
  }
  const { item, user: lister } = data;

  return (
    <>
      {
        <motion.div
          onClick={() => {
            navigate('/item/' + item._id);
          }}
          key={item._id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.25 }}
          viewport={{ once: true }}
          className="relative transition duration-500 bg-white border rounded-lg cursor-pointer border-lightBorderColor hover:shadow-md "
        >
          <div className="relative m-2">
            <div className="w-full h-40 ">
              <ImageView
                _id={item._id}
                url={item.images[0]}
                shimmerClass={'max-h-40 rounded-md'}
                imageClass={
                  'h-40 border-dashed border-2 border-lightBorderColor rounded-md px-2 py-2'
                }
              />
            </div>
            {!isCart && (
              <div className="absolute top-0 left-0 px-4 py-2 text-xs text-white shadow-lg bg-accentColor rounded-tl-md rounded-br-md">
                23% off
              </div>
            )}
          </div>

          <div className="bg-gray-200 inline-flex flex-row mx-2 items-center justify-start px-3 gap-3 py-1 rounded-[5px] text-xs ">
            <Clock />
            <TimeAgo date={item.listedAt} live={false} />
          </div>
          <div className="px-4 rounded-lg ">
            <h1 className="text-xl font-bold text-gray-700 hover:text-gray-900 hover:cursor-pointer">
              {item.name}
            </h1>
            {appState.userData._id != lister._id && (
              <p className="text-sm text-gray-500">{lister.name}</p>
            )}

            <p className="text-lg font-extrabold text-green-500">{'₹ ' + item.price + '/kg'}</p>

            {/* Add Button for Customer */}
            {appState.isCustomer() && !isCart && (
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  await addToCart(item._id, count);
                }}
                className={cn(
                  'h-[40px] z-10 absolute right-2 bottom-2 flex items-center justify-center transition-all duration-500 rounded-md ',
                  'border-2 border-accentColor bg-accentColor bg-opacity-5'
                )}
              >
                <p className={cn('px-4 py-2 text-lg font-bold ', 'text-accentColor')}>ADD</p>
              </button>
            )}

            {/* Spacing for the absolute actions */}
            <div className="h-[8vh]"></div>

            {/* Delete Button (Customer|Admin|Farmer) */}
            {(isCart || appState.isAdmin() || appState.isOwner(item.listedBy)) && (
              <div className="absolute bottom-2 right-2 w-full gap-3 flex flex-row">
                <div className="flex-grow"></div>
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (isCart) {
                      deleteItemFromCartMutation.mutate();
                      return;
                    }
                    deleteItemMutation.mutate();
                  }}
                  className={cn(
                    'h-[40px] flex items-center justify-center transition-all duration-500 border-2 rounded-md bg-opacity-10 hover:bg-opacity-100',
                    'border-errorColor bg-errorColor'
                  )}
                >
                  <p
                    className={cn(
                      'px-4 py-2 text-lg font-bold hover:text-white transition-all duration-500',
                      'text-errorColor'
                    )}
                  >
                    <Trash />
                  </p>
                </button>
                {appState.isCustomer() && isCart && (
                  <div className="w-[50%] h-[40px] flex flex-row items-center justify-center border border-lightBorderColor rounded-md px-2">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();

                        if (count === 1) {
                          deleteItemFromCartMutation.mutate();
                          return;
                        }

                        if (count > 0) {
                          const newCount = count - 1;
                          setCount(newCount);
                          updateCartMutation.mutate(newCount);
                        }
                      }}
                      className="cursor-pointer flex-1 h-[100%] flex justify-center items-center"
                    >
                      <Minus />
                    </div>
                    <div className="flex-1 h-[100%] flex justify-center items-center text-center bg-lightBorderColor">
                      {count}
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        const newCount = count + 1;
                        setCount(newCount);
                        updateCartMutation.mutate(newCount);
                      }}
                      className="cursor-pointer flex-1 h-[100%] flex justify-center items-center text-center"
                    >
                      <Plus />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      }
    </>
  );
}

ShopItem.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemCount: PropTypes.number.isRequired,
  isCart: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ShopItem;
