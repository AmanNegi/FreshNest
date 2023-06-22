const APP_STATE_KEY = "AgroMillets-AppState";

class AppState {
  userData = {};
  isLoggedIn = false;

  __init__() {
    console.log("In __init__ AppState.js...");
    var data = JSON.parse(localStorage.getItem(APP_STATE_KEY)) ?? {};
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
  }

  isUserLoggedIn() {
    // console.log("IS USER LOGGED IN : ", this.loggedIn, this.userData);
    if (!this.isLoggedIn || !this.userData) return false;
    return true;
  }

  getUserData() {
    return { ...this.userData };
  }

  isAdmin() {
    return this.userData.userType === "admin";
  }

  isFarmer() {
    return (this.userData.userType === "farmer");
  }
  isCustomer() {
    return (this.userData.userType === "customer");
  }

  setUserData(data) {
    this.saveUserData(data, this.isLoggedIn);
  }
}

/// Singleton instance for AppState
const appState = new AppState();
export default appState;
