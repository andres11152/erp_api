"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _usersController = require("../controllers/users.controller.js");
var router = (0, _express.Router)();
router.get('/api/users', _usersController.getUsers);
router.get('/api/usersbyid/:id', _usersController.getUsersById);
router.post('/api/createusers', _usersController.createUsers);
router.put('/api/updateusers/:id', _usersController.updateUsers);
router["delete"]('/api/deleteusers/:id', _usersController.deleteUsers);
var _default = exports["default"] = router;