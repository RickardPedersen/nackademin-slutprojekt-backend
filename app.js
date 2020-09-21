const express = require("express");
const app = express();
const handleErrors = require("./middlewares/handleError");

app.use(express.json());
app.use(express.static("public"));

const registerRoute = require("./routes/registerRoute");

// Routes
app.use("/api/register", registerRoute);

app.use(handleErrors);

module.exports = app;
