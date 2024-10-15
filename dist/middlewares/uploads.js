"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _path = _interopRequireDefault(require("path"));
var _multer = _interopRequireDefault(require("multer"));
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    var ext = _path["default"].extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: function fileFilter(req, file, callback) {
    if (file.mimetype === "application/pdf") {
      callback(null, true);
    } else {
      callback(new Error('Solo se permiten archivos PDF'));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2 // 2MB
  }
});
var _default = exports["default"] = upload;