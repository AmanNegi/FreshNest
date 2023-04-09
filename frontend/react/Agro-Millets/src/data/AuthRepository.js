// import { LocalStorage } from "node-localstorage";

// global.localStorage = new LocalStorage("./scratch");
const PREFS_KEY = "AgroMillets-App-Data";

class AuthManager {
  loggedIn = false;
  userData = {};

  __init__() {
    console.log("In __init__ AuthRepository.js...");
    this.userData = JSON.parse(localStorage.getItem(PREFS_KEY)) ?? {};
    if(this.userData._id) this.loggedIn = true;
    console.log("Local Storage Data: ", this.userData, this.loggedIn);
  }

  logInUser(credentials) {
    this.userData = credentials;
    this.loggedIn = true;
    localStorage.setItem(PREFS_KEY, JSON.stringify(this.userData));
    console.log("User logged in", this.userData, this.loggedIn);
  }

  logOutUser() {
    this.userData = null;
    this.loggedIn = false;
  }

  isLoggedIn() {
    if (!this.loggedIn || this.userData == null) return false;
    return true;
  }

  getUserData() {
    return { ...this.userData };
  }

  setUserData(data) {
    this.userData = data;
  }
}

const authManager = new AuthManager();
export default authManager;
