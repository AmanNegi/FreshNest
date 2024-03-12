/**
 * @typedef {Object} Item
 *
 * @property {string} _id
 * @property {string} listedBy
 * @property {string} name
 * @property {string} description
 * @property {string[]} images
 * @property {number} price
 * @property {Comment[]} comments
 * @property {Location} location
 * @property {string} listedAt
 */
class Item {
  constructor(_id, listedBy, name, description, images, price, comments, listedAt, location) {
    this._id = _id;
    this.listedBy = listedBy;
    this.name = name;
    this.description = description;
    this.images = images;
    this.price = price;
    this.comments = comments;
    this.listedAt = listedAt;
    this.location = location;
  }
}

/**
 * @typedef {Object} Location
 * @property {string} type
 * @property {number[]} coordinates
 */
class Location {
  constructor(type, coordinates) {
    this.type = type;
    this.coordinates = coordinates;
  }
}
/**
 * @typedef {Object} Comment
 *
 * @property {string} id
 * @property {string} commentBy
 * @property {string} name
 * @property {string} content
 * @property {string} commentAt
 */

class Comment {
  constructor(id, commentBy, name, content, commentAt) {
    this.id = id;
    this.commentBy = commentBy;
    this.name = name;
    this.content = content;
    this.commentAt = commentAt;
  }
}
