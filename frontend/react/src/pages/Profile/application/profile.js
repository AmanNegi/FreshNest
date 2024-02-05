import axios from "axios";
import appState from "../../../data/AppState";
import { toast } from "react-toastify";
import { handleUpload } from "../../AddItem/application/functions";

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
    { ...body, _id: appState.getUserData()._id }
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

export async function addFarmImage(image) {
  toast.info("Uploading image...");
  const imageUrl = await handleUpload(image);

  if (!imageUrl) {
    toast.error("An error occurred while uploading image");
    return;
  }

  const url =
    import.meta.env.VITE_API_URL +
    `/auth/addImage/${appState.getUserData()._id}`;
    
  // To make the process fast we don't wait for the response
  axios.post(url, { image: imageUrl });
  return imageUrl;
}

/**
 * Makes request to backend to get the user's profile
 * @returns {Promise<string[]>} The user's profile
 */
export async function getFarmerImages() {

  if(!appState.isUserLoggedIn()) {
    toast.error("You must be logged in to view your profile");
    return [];
  }

  const res = await axios.get(
    import.meta.env.VITE_API_URL + `/auth/${appState.getUserData()._id}`
  );

  console.log(res);
  if (res.status === 200) {
    return res.data.data.images;
  }
  return [];
}
