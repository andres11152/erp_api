"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsersCount = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _connection = require("../database/connection.js");
var _queriesInterface = require("../database/queries.interface.js");
// Asegúrate de que esta ruta sea correcta

var getUsersCount = exports.getUsersCount = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var client, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _connection.getConnection)();
        case 3:
          client = _context.sent;
          _context.next = 6;
          return client.query(_queriesInterface.queries.menu.countUsers);
        case 6:
          result = _context.sent;
          res.status(200).json({
            count: result.rows[0].count
          }); // Enviar la respuesta como un objeto JSON
          _context.next = 10;
          return client.end();
        case 10:
          _context.next = 16;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error("Error al obtener el conteo de usuarios", _context.t0);
          res.status(500).json({
            error: "Error al obtener el conteo de usuarios"
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function getUsersCount(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();