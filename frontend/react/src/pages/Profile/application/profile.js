import axios from "axios";
import { API_URL } from "../../../constants";
import appState from "../../../data/AppState";

// http://localhost:3000/api/profile/updateUser
export default async function updateUser(body) {
  var res = await axios.post(API_URL + "/profile/updateUser", body);

  console.log(res);
  appState.setUserData(res.data);
}
