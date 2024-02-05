import { toast } from "react-toastify";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import storage from "../../../main";

/**
 *  Uploads a file to Firebase Storage
 * @param {string} file
 * @returns {Promise<string?>} url
 */
export async function handleUpload(file) {
  if (!file) {
    alert("Please choose a file first!");
  }

  const _id = uuidv4();
  const extension = file.name.split(".").pop();

  const storageRef = ref(storage, `/files/${_id + extension}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  try {
    // Wait for the upload task to complete
    await new Promise((resolve, reject) => {
      uploadTask.on("state_changed", null, reject, () => resolve());
    });

    // Get the download URL
    const url = await getDownloadURL(uploadTask.snapshot.ref);
    console.log(url);
    return url;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Saves data to backend
 * @param {Object} data
 * @param {string} data.listedBy - The ID of the user who listed the item.
 * @param {string} data.name - The name of the item.
 * @param {string} data.description - The description of the item.
 * @param {string} data.price - The price of the item.
 * @param {string} data.file - The file of the item.
 
 * @returns {Promise<boolean>} true if successful, false otherwise
 */

export async function addItem(data) {
  const { listedBy, name, description, price, file, latitude, longitude } =
    data;

  try {
    const img = await handleUpload(file);

    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/list/addItem",
      {
        listedBy: listedBy,
        name: name,
        description: description,
        images: [img],
        price: price,
        comments: [],
        location: {
          type: "Point",
          coordinates: [latitude, longitude],
        },
      }
    );

    console.log(res);

    if (res.data.statusCode == 200) {
      toast.success(res.data.message);
      return true;
    } else {
      toast.error(res.data.message);
      return false;
    }
  } catch (err) {
    console.log(err);
    toast.error("Error uploading image");
    return false;
  }
}
