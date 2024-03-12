/**
 * Represents an item in the shop.
 */
export class Item {
  /**
   * Creates a new item.
   * @param {string} id - The ID of the item.
   * @param {string} listedBy - The ID of the user who listed the item.
   * @param {string} name - The name of the item.
   * @param {string} description - The description of the item.
   * @param {string[]} images - An array of image URLs for the item.
   * @param {number} price - The price of the item.
   * @param {Date} listedAt - The date and time when the item was listed.
   * @param {Comment[]} comments - An array of comments on the item.
   */
  constructor(id, listedBy, name, description, images, price, listedAt, comments) {
    this._id = id;
    this.listedBy = listedBy;
    this.name = name;
    this.description = description;
    this.images = images;
    this.price = price;
    this.listedAt = listedAt;
    this.comments = comments;
  }
}

/**
 * Represents a comment on an item.
 */
export class Comment {
  /**
   * Creates a new comment.
   * @param {string} commentBy - The ID of the user who made the comment.
   * @param {string} name - The name of the user who made the comment.
   * @param {string} content - The content of the comment.
   * @param {Date} commentAt - The date and time when the comment was made.
   * @param {string} id - The ID of the comment.
   */
  constructor(commentBy, name, content, commentAt, id) {
    this.commentBy = commentBy;
    this.name = name;
    this.content = content;
    this.commentAt = commentAt;
    this._id = id;
  }
}
