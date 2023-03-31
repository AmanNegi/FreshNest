import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constants";

// http://localhost:3000/api/list/getAll

export default async function login(email, password) {
  var res = await axios.post(API_URL + "/auth/login", {
    email: email,
    password: password,
  });

  console.log(res);
  return res.data;
}
