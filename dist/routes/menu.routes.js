"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _menuController = require("../controllers/menu.controller.js");
var _jwtValidador = require("../middlewares/jwt.validador.js");
var router = (0, _express.Router)();
router.get("/api/userscount", _jwtValidador.verifyToken, _menuController.getUsersCount);
var _default = exports["default"] = router;