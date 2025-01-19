import axios from 'axios';
import { toast } from 'react-toastify';
import appState from '../../../data/AppState';

/**
 * Login using email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} A Promise that resolves with the user account data.
 */
export default async function login(email, password) {
  const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', {
    email,
    password
  });

  if (res.data.statusCode === 200) {
    toast.success(res.data.message);
  } else {
    toast.error(res.data.message);
  }
  appState.saveUserData(res.data.data, true);
  return res.data;
}

/**
 * Register using email and password.
 * @async
 * @param {Object} data - The user account data.
 * @param {string} data.name - The user's name.
 * @param {string} data.email - The user's email address.
 * @param {string} data.password - The user's password.
 * @param {string} data.userType - The user's type (e.g. "customer", "admin").
 * @param {string} data.phone - The user's phone number.
 * @returns {Promise<Object>} A Promise that resolves with the user account data.
 */
export async function signUp(data) {
  const { name, email, password, userType, phone, latitude, longitude } = data;

  const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/signup', {
    name,
    email: email.toLowerCase(),
    password,
    userType,
    phone,
    location: {
      type: 'Point',
      coordinates: [latitude, longitude]
    }
  });

  if (res.data.statusCode === 200) {
    toast.success(res.data.message);
  } else {
    toast.error(res.data.message);
  }
  appState.saveUserData(res.data.data, true);
  return res.data;
}

/**
 * After logging in with Google, save the user's data in the database.
 * @param {string} name
 * @param {string} email
 */
export async function gSignUp(name, email) {
  const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/saveGLogin', {
    name,
    email: email.toLowerCase()
  });

  return res.data;
}
