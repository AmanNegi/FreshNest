import axios from "axios";
import { API_URL } from "../../../constants";

export default async function getAll() {
  var res = await axios.get(API_URL + "/list/getAll");

  console.log(res);
  return res.data.data;
}
