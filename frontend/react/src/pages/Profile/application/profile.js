import axios from "axios";
import appState from "../../../data/AppState";
import { toast } from "react-toastify";

/**
 * Makes request to backend to update the user's profile
 * @param {Object} body
 * @param {string} body.name
 * @param {string} body.email
 * @param {string} body.phone
 */
export default async function updateUser(body) {
  const res = await axios.post(
    import.meta.env.VITE_API_URL + "/profile/updateUser",
    { ...body, _id: appState.userData._id }
  );

  console.log(res);
  if (res.status !== 200) {
    toast.error(
      "An error occurred while updating your profile. Please try again later."
    );
  } else {
    appState.setUserData(res.data.data);
  }
}
