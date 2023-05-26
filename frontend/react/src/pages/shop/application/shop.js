import axios from "axios";
import { API_URL } from "../../../constants";
import { toast } from "react-toastify";
import appState from "../../../data/AppState";

export default async function getAll() {
  var res = await axios.get(API_URL + "/list/getAll");

  console.log(res);
  return res.data.data;
}

export async function getItem(id) {
  try {
    var res = await axios.get(API_URL + "/list/getItem/" + id);
    console.log(res);
    return res.data.data;
  } catch (e) {
    return undefined;
  }
}

export async function addComment(comment) {
  console.log(comment, appState.getUserData());
  if (!appState.isUserLoggedIn()) {
    toast.error("You must be logged in to add a comment");
    return 0;
  }
  var res = await axios.post(API_URL + "/list/comment", {
    commentBy: appState.getUserData()._id,
    itemID: comment.itemID,
    name: appState.getUserData().name,
    content: comment.comment,
    commentAt: Date.now(),
  });

  console.log(res);
  return 1;
}

// http://localhost:3000/api/admin/deleteItem
export async function deleteItem(itemId) {
  if (
    !appState.isUserLoggedIn() ||
    appState.getUserData().userType != "admin"
  ) {
    toast.error("You must be an admin to delete an item");
    return 0;
  }
  var res = await axios.post(API_URL + "/admin/deleteItem", {
    adminId: appState.getUserData()._id,
    itemId: itemId,
  });

  if (res.data.statusCode == 200) {
    toast.success(res.data.message);
  }

  console.log(res);
  return 1;
}
