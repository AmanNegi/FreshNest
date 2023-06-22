import axios from "axios";
import { toast } from "react-toastify";

// http://localhost:3000/api/search/{yourQueryHere}

export default async function search(query) {
  var res = await axios.get(proces.env.API_URL + `/search/${query}`);
  console.log(res);
  if (res.data.statusCode === 200) {
    return res.data.data;
  }
  toast.error(res.data.message);
  return [];
}
