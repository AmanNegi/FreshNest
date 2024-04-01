/**
 * Represents a shopping cart.
 */
export class Cart {
  /**
   * Creates a new Cart instance.
   * @param {string} id - The ID of the cart.
   * @param {string} userId - The ID of the user who owns the cart.
   * @param {CartItem[]} items - The items in the cart.
   */
  constructor(id, userId, items) {
    this._id = id;
    this.userId = userId;
    this.items = items;
  }
}

/**
 * Represents an item in a shopping cart.
 */
export class CartItem {
  /**
   * Creates a new CartItem instance.
   * @param {number} count - The number of items in the cart.
   * @param {Item} item - The ID of item in the cart.
   * @param {string} id - The ID of the cart item.
   * @param {Date} addedAt - The date the item was added to the cart.
   */
  constructor(count, item, id, addedAt) {
    this.count = count;
    this.item = item;
    this._id = id;
    this.addedAt = addedAt;
  }
}
