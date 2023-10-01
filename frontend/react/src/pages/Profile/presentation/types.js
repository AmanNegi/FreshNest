/**
 * Represents a user.
 * @class
 * @classdesc A user object with a name, email, and phone number.
 */
export class User {
  /**
   * Creates a new user.
   * @param {string} name - The name of the user.
   * @param {string} email - The email address of the user.
   * @param {string} phone - The phone number of the user.
   */
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}
