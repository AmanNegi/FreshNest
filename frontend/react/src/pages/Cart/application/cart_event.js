import Emittery from "emittery";


// Event Emitter related Logic

const cartEmitter = new Emittery();

export function emitCartUpdateEvent(cartCount) {
  cartEmitter.emit("cartUpdate", cartCount);
}

// Local Storage related Logic
const CART_COUNT_KEY = "cartCount";

export function getCartCount() {
  return localStorage.getItem(CART_COUNT_KEY) ?? 0;
}

export function saveCartCount(cartCount) {
  localStorage.setItem(CART_COUNT_KEY, cartCount);
}

export default cartEmitter;
