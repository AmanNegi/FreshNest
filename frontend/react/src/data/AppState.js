import { saveCartCount } from "../pages/Cart/application/cart_event";

const APP_STATE_KEY = "AgroMillets-AppState";

class AppState {
  /**
   * @typedef {Object} User
   * @property {string|undefined} _id - The ID of the user.
   * @property {string|undefined} name - The name of the user.
   * @property {string|undefined} email - The email address of the user.
   * @property {string|undefined} phone - The phone number of the user.
   * @property {string|undefined} userType - The type of user (e.g. "admin", "customer").
   * @property {string|undefined} createdAt - The date and time when the user was created.
   * @property {string|undefined} pattern - The user background pattern is stored here.
   */

  /**  @type {User} */
  userData = {
    createdAt: undefined,
    email: undefined,
    name: undefined,
    phone: undefined,
    userType: undefined,
    _id: undefined,
    pattern: undefined,
  };

  isLoggedIn = false;

  __init__() {
    console.log("In __init__ AppState.js...");
    const data = JSON.parse(localStorage.getItem(APP_STATE_KEY)) ?? {};
    console.log("Local AppState Data: ", data);
    this.userData = data.userData ?? {};
    this.isLoggedIn = data.isLoggedIn ?? false;
  }

  /**
   * @param {Map} userData
   * @param {boolean} isLoggedIn
   */
  saveUserData(userData, isLoggedIn) {
    this.userData = userData;
    this.isLoggedIn = isLoggedIn;
    localStorage.setItem(
      APP_STATE_KEY,
      JSON.stringify({ userData, isLoggedIn })
    );
  }

  logOutUser() {
    this.saveUserData({}, false);
    saveCartCount(0);
  }

  isUserLoggedIn() {
    // console.log("IS USER LOGGED IN : ", this.loggedIn, this.userData);
    if (!this.isLoggedIn || !this.userData._id) {
      this.isLoggedIn = false;
      return false;
    }
    return true;
  }

  /**
   * Get the user data.
   * @returns {User}
   */
  getUserData() {
    return { ...this.userData };
  }

  isAdmin() {
    return this.userData.userType === "admin";
  }

  isFarmer() {
    return this.userData.userType === "farmer";
  }
  isCustomer() {
    return this.userData.userType === "customer";
  }

  setUserData(data) {
    this.saveUserData(data, this.isLoggedIn);
  }
}

/// Singleton instance for AppState
const appState = new AppState();
export default appState;
