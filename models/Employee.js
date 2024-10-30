const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  //name, age, phone-no, city
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
  },
  city: {
    type: String,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
