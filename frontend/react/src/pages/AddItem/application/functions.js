import { toast } from 'react-toastify';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
// import Compressor from 'compressorjs';

/**
 *  Uploads a file to Firebase Storage
 * @param {File} file
 * @returns {Promise<string?>} url
 */
export async function handleUpload(file) {
  if (!file) {
    alert('Please choose a file first!');
  }
  // Initialize Firebase
  const { initializeApp } = await import('firebase/app');
  const { getStorage } = await import('firebase/storage');

  const app = initializeApp({
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
  });

  const storage = getStorage(app);

  const _id = uuidv4();
  const extension = file.name.split('.').pop();

  const storageRef = ref(storage, `/files/${_id + extension}`);
  const compressedImage = await compressImage(file);

  if (!compressedImage) {
    console.error('Error compressing image');
    return null;
  }

  const uploadTask = uploadBytesResumable(storageRef, compressedImage);

  try {
    // Wait for the upload task to complete
    await new Promise((resolve, reject) => {
      uploadTask.on('state_changed', null, reject, () => resolve());
    });

    // Get the download URL
    const url = await getDownloadURL(uploadTask.snapshot.ref);
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
  const { listedBy, name, description, price, file } = data;

  try {
    const img = await handleUpload(file);

    const res = await axios.post(import.meta.env.VITE_API_URL + '/list/addItem', {
      listedBy,
      name,
      description,
      images: [img],
      price,
      comments: []
    });

    if (res.data.statusCode === 200) {
      toast.success(res.data.message);
      return true;
    } else {
      toast.error(res.data.message);
      return false;
    }
  } catch (err) {
    console.warn(err);
    toast.error('Error uploading image');
    return false;
  }
}

async function compressImage(file) {
  const Compressor = (await import('compressorjs')).default;

  let compressedImage = undefined;
  try {
    compressedImage = await new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        height: 400,
        width: 800,
        success: resolve,
        error: reject
      });
    });
  } catch (error) {
    console.error(error);
  }

  return compressedImage;
}
