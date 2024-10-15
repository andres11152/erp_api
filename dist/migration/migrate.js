"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fs = _interopRequireDefault(require("fs"));
var _connection = require("../database/connection.js");
var runMigration = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var client, sql;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          client = _context.sent;
          _context.prev = 3;
          sql = _fs["default"].readFileSync("src/database/db.sql", "utf-8");
          _context.next = 7;
          return client.query(sql);
        case 7:
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
        case 12:
          _context.prev = 12;
          _context.next = 15;
          return client.end();
        case 15:
          return _context.finish(12);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 9, 12, 16]]);
  }));
  return function runMigration() {
    return _ref.apply(this, arguments);
  };
}();
runMigration();