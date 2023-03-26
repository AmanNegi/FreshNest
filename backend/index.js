const express = require("express");

const app = express();
app.use(express.json());
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
