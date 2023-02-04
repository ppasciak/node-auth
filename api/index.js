require('dotenv').config();
const express = require("express");
const app = express();
const port = 3001;
const routes = require("./src/routes");
const sequelize = require("./src/services/db");
const bodyParser = require("body-parser");
const { verifyToken } = require("./src/middlewares/verifyToken");

app.use(bodyParser.json());

sequelize
    .authenticate()
    .then(() => {
        console.info("INFO - Database connected.");
    })
    .catch((err) => {
        console.error("ERROR - Unable to connect to the database:", err);
    });

app.get("/protected", verifyToken, (req, res) => {
    res.send("Hello World!");
});

app.use("/", routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
