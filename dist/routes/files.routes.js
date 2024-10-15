"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _filesController = require("../controllers/files.controller.js");
var _uploads = _interopRequireDefault(require("../middlewares/uploads.js"));
var router = _express["default"].Router();
router.post("/api/add", _uploads["default"].single('file'), _filesController.addArlFile);
router.get("/api/get", _filesController.getArlFile);
var _default = exports["default"] = router;