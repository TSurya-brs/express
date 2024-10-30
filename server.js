const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employeeRoutes");

const port = process.env.port || 9000;
const exp = express();

dotenv.config();

exp.use(bodyParser.json());

mongoose
  .connect(process.env.Mongodb_url)
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => {
    console.log("Mongodb not connected");
  });

exp.use("/employee", employeeRoutes); //Middlewave

exp.listen(port, () => {
  console.log(`Server connected to ${port}`);
});
