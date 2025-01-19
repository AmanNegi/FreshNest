import axios from 'axios';
import { toast } from 'react-toastify';
import appState from '../../../data/AppState';

/**
 * Get a list of items from the database.
 * @param {string} filter - The filter to apply to the list.
 * @returns {Promise<Item>} - The sorted list of items.
 */
export default async function getItems(filter = '0') {
  let list;

  if (appState.isFarmer()) {
    // farmers will only see their products
    list = await getAllFarmerItems(appState.getUserData()._id);
  } else {
    // admin and user will see all items
    list = await getAllItems();
  }

  return sortList(list, filter);
}

/**
 * Get First Four Items for Home Page
 * @returns {Promise<Array<Item>>} - First Five Items
 */
export async function getFourItems() {
  let list = [];
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/list/getRecent`);

  if (res.data.statusCode === 200 && res.data.data) {
    list = res.data.data.slice(0, 4);
  }

  return list;
}

/**
 * Sort a list of items based on a filter.
 * @param {Array<Item>} list - The list of items to sort.
 * @param {string} filter - The filter to apply to the list.
 * @returns {Array<Item>} - The sorted list of items.
 */
export function sortList(list, filter) {
  switch (filter) {
    case '0': {
      list.sort((a, b) => {
        return a.listedAt < b.listedAt ? 1 : -1;
      });
      break;
    }

    case '1': {
      list.sort((a, b) => {
        return a.listedAt > b.listedAt ? 1 : -1;
      });
      break;
    }
    case '2': {
      list.sort((a, b) => {
        return a.name[0] > b.name[0] ? 1 : -1;
      });
      break;
    }
    case '3': {
      list.sort((a, b) => {
        return a.name[0] < b.name[0] ? 1 : -1;
      });
      break;
    }
    case '4': {
      list.sort((a, b) => {
        return a.price > b.price ? 1 : -1;
      });
      break;
    }
    case '5': {
      list.sort((a, b) => {
        return a.price < b.price ? 1 : -1;
      });
      break;
    }

    default: {
      return list;
    }
  }

  return list;
}

/**
 * Get all items from the database.
 * @returns {Promise<Array<Item>|undefined>} - The list of all items.
 */
export async function getAllItems() {
  const res = await axios.get(import.meta.env.VITE_API_URL + '/list/getAll');

  return res.data.data;
}

/**
 * Get all items listed by the current farmer from the database.
 * @returns {Promise<Array<Item>|undefined>} - The list of items listed by the current farmer.
 */
export async function getAllFarmerItems(id) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/list/getAll/${id}`);

  return res.data.data;
}

/**
 * Get an item from the database by ID.
 * @param {string} id - The ID of the item to get.
 * @returns {Promise<Item|Error|undefined>} - The item with the specified ID.
 */
export async function getItem(id) {
  const res = await axios.get(import.meta.env.VITE_API_URL + '/list/getItem/' + id);
  return res.data.data;
}

/**
 * Add a comment to an item in the database.
 * @param {Object} comment - The comment to add.
 * @param {string} comment.itemID - The ID of the item to add the comment to.
 * @param {string} comment.comment - The content of the comment.
 * @returns {Promise<Object>} A status code indicating success or failure.
 */
export async function addComment(comment) {
  if (!appState.isUserLoggedIn()) {
    toast.error('You must be logged in to add a comment');
    return null;
  }
  const res = await axios.post(import.meta.env.VITE_API_URL + '/list/comment', {
    commentBy: appState.getUserData()._id,
    itemID: comment.itemID,
    name: appState.getUserData().name,
    content: comment.comment,
    commentAt: Date.now()
  });

  toast.success('Comment added successfully!');
  return res.data.data;
}

/**
 * Delete an item from the database.
 * @param {string} itemId - The ID of the item to delete.
 * @param {string} listedBy - The ID of the user who listed the item.
 * @returns {Promise<Object>}  A status code indicating success or failure.
 */
export async function deleteItem(itemId, listedBy) {
  if (appState.isAdmin() || appState.isOwner(listedBy)) {
    const res = await axios.post(import.meta.env.VITE_API_URL + '/admin/deleteItem', {
      adminId: appState.getUserData()._id,
      itemId
    });

    if (res.data.statusCode === 200) {
      toast.success(res.data.message);
      return res.data.data;
    } else {
      toast.error(res.data.message);
      return 0;
    }
  }
  if (appState.getUserData().userType !== 'admin') {
    toast.error('You must be an admin to delete an item');
  }
  if (!appState.isOwner(listedBy)) {
    toast.error('You are not the owner of the item');
  }

  return 0;
}

/**
 * Returns the user's profile from the database.
 * @param {string} id
 * @returns {User} If User is found
 */
export async function getUserFromId(id) {
  const res = await axios.get(import.meta.env.VITE_API_URL + '/auth/' + id);

  if (!res) {
    throw new Error('User not found');
  }

  if (!res.data.data) {
    throw new Error('User not found');
  }

  return res.data.data;
}
