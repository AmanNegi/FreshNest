import axios from "axios";
import { API_URL } from "../../../constants";
import authManager from "../../../data/AuthRepository";

// http://localhost:3000/api/profile/updateUser
export default async function updateUser(body) {
  var res = await axios.post(API_URL + "/profile/updateUser", body);

  console.log(res);
  authManager.setUserData(res.data);
}
