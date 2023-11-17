const express = require("express");
const employecreate = require("../Function/EmployeeCreate");
const getEmployee = require("../Function/GetEmployee");
const deleteEmployee = require("../Function/Delete");
const updateDetails = require("../Function/Edit");
const getForUpdate = require("../Function/GetDeatilsForEdit");

const Router = express.Router();

Router.route("/create").post(employecreate);
Router.route("/viewEmployee").get(getEmployee);
Router.route("/delete/:_id").delete(deleteEmployee);
Router.route("/edit/:_id").put(updateDetails);
Router.route("/getemployee/:_id").get(getForUpdate);

module.exports = Router;
