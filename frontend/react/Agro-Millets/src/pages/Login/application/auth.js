import axios from "axios";
import { useNavigate } from "react-router-dom";

// http://localhost:3000/api/list/getAll

export default async function login(email, password) {
  var res = await axios.post("http://localhost:3000/api/auth/login", {
    email: email,
    password: password,
  });

  console.log(res);
  return res.data;
}
