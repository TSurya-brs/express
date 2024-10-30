const Employee = require("../models/Employee");
const createEmployee = async (req, res) => {
  try {
    const { name, age, phone, city } = req.body;

    const employee = new Employee({
      name,
      age,
      phone,
      city,
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    console.log("There is an Error", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createEmployee };
