const APP_STATE_KEY = "AgroMillets-AppState";

class AppState {
  userData = {};
  isLoggedIn = false;
  cart = [];

  __init__() {
    console.log("In __init__ AppState.js...");
    var data = JSON.parse(localStorage.getItem(APP_STATE_KEY)) ?? {};
    console.log("Local AppState Data: ", data);
    this.userData = data.userData ?? {};
    this.isLoggedIn = data.isLoggedIn ?? false;
    this.cart = data.cart ?? [];
  }

  /**
   * @param {Map} userData
   * @param {boolean} isLoggedIn
   * @param {List} cart
   */
  saveUserData(userData, isLoggedIn, cart) {
    this.userData = userData;
    this.isLoggedIn = isLoggedIn;
    this.cart = cart;
    localStorage.setItem(
      APP_STATE_KEY,
      JSON.stringify({ userData, isLoggedIn, cart })
    );
  }

  addItemToCart(item) {
    var exists = this.cart.filter((e) => e._id == item._id);
    if (exists) {
      //TODO: Simply increase the count here
      console.log("Item Prexists in Cart");
      return;
    }
    this.saveUserData(this.userData, this.isLoggedIn, [...this.cart, item]);
  }

  logOutUser() {
    this.saveUserData({}, false, []);
  }

  isUserLoggedIn() {
    if (!this.loggedIn || this.userData == null) return false;
    return true;
  }

  getUserData() {
    return { ...this.userData };
  }

  setUserData(data) {
    this.saveUserData(data, this.isLoggedIn, this.cart);
  }
}

/// Singleton instance for AppState
const appState = new AppState();
export default appState;
