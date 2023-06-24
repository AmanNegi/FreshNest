import axios from "axios";
import { toast } from "react-toastify";
import appState from "../../../data/AppState";

// http://localhost:3000/api/auth/login

export default async function login(email, password) {
  var res = await axios.post(import.meta.env.VITE_API_URL + "/auth/login", {
    email: email,
    password: password,
  });

  console.log(res);
  if (res.data.statusCode == 200) {
    toast.success(res.data.message);
  } else {
    toast.error(res.data.message);
  }
  appState.saveUserData(res.data.data, true);
  return res.data;
}

export async function gSignUp(name, email) {
  var res = await axios.post(
    import.meta.env.VITE_API_URL + "/auth/saveGLogin",
    {
      name: name,
      email: email,
    }
  );

  console.log(res);
  return res.data.data;
}
