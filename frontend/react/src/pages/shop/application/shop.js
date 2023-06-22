import axios from "axios";
import { toast } from "react-toastify";
import appState from "../../../data/AppState";

export default async function getItems(filter) {
  let list;

  if (appState.isFarmer()) {
    // farmers will only see their products
    list = await getAllFarmerItems();
  } else {
    // admin and user will see all items
    list = await getAllItems();
  }

  return sortList(list, filter);
}

function sortList(list, filter) {
  switch (filter) {
    case "0": {
      list.sort((a, b) => {
        return a.listedAt > b.listedAt ? 1 : -1;
      });
      break;
    }
    case "1": {
      list.sort((a, b) => {
        return a.listedAt < b.listedAt ? 1 : -1;
      });
      break;
    }
    case "2": {
      list.sort((a, b) => {
        return a.name[0] > b.name[0] ? 1 : -1;
      });
      break;
    }
    case "3": {
      list.sort((a, b) => {
        return a.name[0] < b.name[0] ? 1 : -1;
      });
      break;
    }
    case "4": {
      list.sort((a, b) => {
        return a.price > b.price ? 1 : -1;
      });
      break;
    }
    case "5": {
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

export async function getAllItems() {
  var res = await axios.get(import.meta.env.VITE_API_URL + "/list/getAll");

  console.log(res);
  return res.data.data;
}

export async function getAllFarmerItems() {
  var id = appState.getUserData()._id;
  console.log("Farmers are: ", id);

  var res = await axios.get(
    `${import.meta.env.VITE_API_URL}/list/getAll/${id}`
  );

  console.log("Farmer Items are: ", res);

  return res.data.data;
}

export async function getItem(id) {
  try {
    var res = await axios.get(
      import.meta.env.VITE_API_URL + "/list/getItem/" + id
    );
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
  var res = await axios.post(import.meta.env.VITE_API_URL + "/list/comment", {
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
  var res = await axios.post(
    import.meta.env.VITE_API_URL + "/admin/deleteItem",
    {
      adminId: appState.getUserData()._id,
      itemId: itemId,
    }
  );

  if (res.data.statusCode == 200) {
    toast.success(res.data.message);
  }

  console.log(res);
  return 1;
}
