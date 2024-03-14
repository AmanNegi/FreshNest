import Emittery from 'emittery';

const cartEmitter = new Emittery();
const CART_COUNT_KEY = 'cartCount';

/**
 * Emit an event to update the cart count in the UI.
 * @param {number} cartCount
 */
export function emitCartUpdateEvent(cartCount) {
  cartEmitter.emit('cartUpdate', cartCount);
}

/**
 * Get the number of items in the cart.
 * @returns {number} The number of items in the cart.
 */
export function getCartCount() {
  return localStorage.getItem(CART_COUNT_KEY) ?? 0;
}

/**
 * Update the number of items in the cart.
 * @param {number} cartCount
 */
export function saveCartCount(cartCount) {
  localStorage.setItem(CART_COUNT_KEY, cartCount);
}

export default cartEmitter;
