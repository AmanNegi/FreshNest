import axios from "axios";
import { toast } from "react-toastify";
import appState from "../../../data/AppState";

// Gets user cart
export default async function getCart() {
  if (!appState.isUserLoggedIn()) {
    toast.error("You must be logged in to view your cart");
    return null;
  }

  var id = appState.userData._id;
  var res = await axios.get(import.meta.env.VITE_API_URL + `/cart/get/${id}`);

  console.log(res);
  return res.data.data.items;
}

// Gets millet item
export async function getItem(id) {
  var res = await axios.get(
    import.meta.env.VITE_API_URL + "/list/getItem/" + id
  );
  console.log(res);
  return res.data.data;
}

// Adds item to cart
export async function addToCart(itemId, count) {
  if (!appState.isUserLoggedIn()) {
    toast.error("You must be logged in to add item to cart");
    return 0;
  }

  var res = await axios.post(import.meta.env.VITE_API_URL + "/cart/add", {
    userId: appState.userData._id,
    item: itemId,
    count: count,
  });

  if (res.data.statusCode == 200) {
    toast.success(res.data.message);
  } else {
    toast.error(res.data.message);
  }

  console.log(res);
  return 1;
}

export async function removeFromCart(itemId) {
  // http://localhost:3000/api/admin/deleteItem
  if (!appState.isUserLoggedIn()) {
    toast.error("You must be logged in to remove item from cart");
    return 0;
  }

  var res = await axios.post(import.meta.env.VITE_API_URL + "/cart/remove", {
    userId: appState.userData._id,
    itemId: itemId,
  });

  if (res.data.statusCode == 200) {
    toast.success(res.data.message);
  } else {
    toast.error(res.data.message);
  }

  console.log(res);
  return 1;
}
