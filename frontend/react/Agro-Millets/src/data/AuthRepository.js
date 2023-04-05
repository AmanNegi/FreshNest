class AuthManager {
  loggedIn = false;
  userData = {};

  logInUser(credentials) {
    this.userData = credentials;
    this.loggedIn = true;
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
