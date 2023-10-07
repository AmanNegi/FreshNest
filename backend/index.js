const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./utils/logger");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["https://fresh-nest.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
