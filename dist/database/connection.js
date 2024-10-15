"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConnection = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _pg = _interopRequireDefault(require("pg"));
var _config = require("../config/config.js");
var Client = _pg["default"].Client;

//funcion para realizar el connection pool
var getConnection = exports.getConnection = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var client;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          client = new Client(_config.dbSettings);
          _context.prev = 1;
          _context.next = 4;
          return client.connect();
        case 4:
          return _context.abrupt("return", client);
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.error('Error conectando a la DB:', _context.t0);
          throw _context.t0;
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 7]]);
  }));
  return function getConnection() {
    return _ref.apply(this, arguments);
  };
}();