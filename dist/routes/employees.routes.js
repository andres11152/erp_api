"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _employeesController = require("../controllers/employees.controller.js");
var router = (0, _express.Router)();
router.get('/api/employees', _employeesController.employees);
var _default = exports["default"] = router;