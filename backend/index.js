const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "https://agro-millets.netlify.app",
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

require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
