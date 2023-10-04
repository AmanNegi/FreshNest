import axios from "axios";
import { toast } from "react-toastify";
import { Item } from "../../shop/application/shop_model";

/**
 * Search for items in the database.
 * @param {string} query 
 * @returns {Promise<Item[]>}
 */
export default async function search(query) {
  const res = await axios.get(import.meta.env.VITE_API_URL + `/search/${query}`);
  console.log(res);
  if (res.data.statusCode === 200) {
    return res.data.data;
  }
  toast.error(res.data.message);
  return [];
}
