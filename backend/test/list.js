const { User } = require("../models/user");
const chai = require("chai");
const chaiHttp = require("chai-http");

const {
  BASE_URL,
  GET_ALL_ITEMS,
  GET_RECENT_ITEMS,
  ADD_ITEM,
} = require("./test_util");

chai.use(chaiHttp);

describe("Test List.js", function () {
  describe("GET api/list/getAll", function () {
    it("should return an array of items", function () {
      chai
        .request(BASE_URL)
        .get(GET_ALL_ITEMS)
        .end(function (err, res) {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.have.property("data");
          chai.expect(res.body.data).to.be.an("array");
        });
    });
  });
  describe("GET api/list/getRecent", function () {
    it("should return the latest 5 items", function () {
      chai
        .request(BASE_URL)
        .get(GET_RECENT_ITEMS)
        .end(function (err, res) {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.have.property("data");
          chai.expect(res.body.data).to.be.an("array");
          chai.expect(res.body.data.length).to.be.lessThanOrEqual(5);
        });
    });
  });
  describe("POST api/list/addItem", async function () {
    it("should add a new item to the database", async function () {
      // First, create a new user and get id
      const newUser = new User({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
        phone: "1234567899",
      });

      newUser.save().then((user) => {
        console.log(user);

        const newItem = {
          name: "Test Item",
          description: "This is a test item",
          price: 10.99,
          listedBy: user._id,
          images: [],
        };

        chai
          .request(BASE_URL)
          .post(ADD_ITEM)
          .send(newItem)
          .end(function (err, res) {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.have.property("data");
            chai.expect(res.body.data).to.have.property("_id");
            chai.expect(res.body.data.name).to.equal(newItem.name);
            chai
              .expect(res.body.data.description)
              .to.equal(newItem.description);
            chai.expect(res.body.data.price).to.equal(newItem.price);
            chai.expect(res.body.data.listedBy).to.equal(newItem.listedBy);
          });
      });
    });
    it("should return an error for invalid user ID", function () {
      const newItem = {
        name: "Test Item",
        description: "This is a test item",
        price: 10.99,
        listedBy: "invalid_id",
      };
      chai
        .request(BASE_URL)
        .post(ADD_ITEM)
        .send(newItem)
        .end(function (err, res) {
          chai.expect(res.body).to.have.property("statusCode");
          chai.expect(res.body).to.have.property("message");
        });
    });
  });
});

exports.chai = chai;
