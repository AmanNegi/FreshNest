import axios from 'axios';
import { toast } from 'react-toastify';

import appState from '../../../data/AppState';
import { emitCartUpdateEvent, saveCartCount } from './cart_event';

/**
 * Get a list of cart items from the database.
 * @returns {Promise<Array<CartItem>|Error>} - The list of items in the cart.
 */
export default async function getCart() {
  if (!appState.isUserLoggedIn()) {
    toast.error('You must be logged in to view your cart');
    throw new Error('User not logged in');
  }

  const id = appState.userData._id;
  const res = await axios.get(import.meta.env.VITE_API_URL + `/cart/get/${id}`);

  emitCartUpdateEvent(res.data.data.items.length);
  saveCartCount(res.data.data.items.length);

  if (res.data.data == undefined || res.data.data.items == undefined) {
    console.warn('cart.js: An error occurred', res);
    throw new Error('Error occured while getting items');
  }
  return res.data.data.items;
}

/**
 * Add an item to the cart.
 * @param {string} itemId
 * @param {number} count
 * @returns {Promise<number>} A status code indicating success or failure.
 */
export async function addToCart(itemId, count) {
  if (!appState.isUserLoggedIn()) {
    toast.error('You must be logged in to add item to cart');
    return 0;
  }

  const res = await axios.post(import.meta.env.VITE_API_URL + '/cart/add', {
    userId: appState.userData._id,
    item: itemId,
    count
  });

  if (res.data.statusCode === 200) {
    emitCartUpdateEvent(res.data.data.items.length);
    saveCartCount(res.data.data.items.length);

    toast.success(res.data.message);
  } else {
    toast.error(res.data.message);
  }

  return 1;
}

export async function updateCartCount(itemId, count) {
  if (!appState.isUserLoggedIn()) {
    toast.error('You must be logged in to update cart');
    return 0;
  }

  const res = await axios.post(import.meta.env.VITE_API_URL + '/cart/update', {
    userId: appState.userData._id,
    itemId,
    count
  });

  if (res.data.statusCode === 200) {
    console.info('Updated Cart Successfully');
  } else {
    toast.error(res.data.message);
  }

  return res.data.data;
}

/**
 * Remove an item from the cart.
 * @param {string} itemId
 * @returns {Promise<number>} A status code indicating success or failure.
 */
export async function removeFromCart(itemId) {
  if (!appState.isUserLoggedIn()) {
    toast.error('You must be logged in to remove item from cart');
    return 0;
  }

  const res = await axios.post(import.meta.env.VITE_API_URL + '/cart/remove', {
    userId: appState.userData._id,
    itemId
  });

  if (res.data.statusCode === 200) {
    toast.success(res.data.message);
  } else {
    toast.error(res.data.message);
  }

  return 1;
}
