import axios from "axios";
import { API_URL } from "../../../constants";
import authManager from "../../../data/AuthRepository";
import { toast } from "react-toastify";

// http://localhost:3000/api/auth/login

export default async function login(email, password) {
  var res = await axios.post(API_URL + "/auth/login", {
    email: email,
    password: password,
  });

  console.log(res);
  if (res.data.statusCode == 200) {
    toast.success(res.data.message);
  } else {
    toast.error(res.data.message);
  }
  authManager.logInUser(res.data.data);
  return res.data;
}
