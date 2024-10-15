"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _connection = require("../database/connection.js");
var _queriesInterface = require("../database/queries.interface.js");
var _config = require("../config.js");
// Asegúrate de que esta ruta sea correcta
// Asegúrate de que esta ruta sea correcta y que `API_KEY` esté definido

var login = exports.login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, client, result, user, passwordMatch, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password; // Cambiado `user` a `email`
          if (!(!email || !password)) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            msg: "Por favor proporciona un correo electrónico y una contraseña válidas."
          }));
        case 3:
          _context.prev = 3;
          _context.next = 6;
          return (0, _connection.getConnection)();
        case 6:
          client = _context.sent;
          _context.next = 9;
          return client.query(_queriesInterface.queries.users.getUsersByEmail, [email]);
        case 9:
          result = _context.sent;
          _context.next = 12;
          return client.end();
        case 12:
          if (!(result.rows.length > 0)) {
            _context.next = 27;
            break;
          }
          user = result.rows[0];
          _context.next = 16;
          return _bcrypt["default"].compare(password, user.user_password);
        case 16:
          passwordMatch = _context.sent;
          if (!passwordMatch) {
            _context.next = 24;
            break;
          }
          _context.next = 20;
          return _jsonwebtoken["default"].sign({
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol,
            permissions: user.permissions
          }, _config.API_KEY);
        case 20:
          token = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            token: token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              rol: user.rol,
              permissions: user.permissions
            }
          }));
        case 24:
          return _context.abrupt("return", res.status(401).json({
            msg: "Correo electrónico o contraseña incorrectos."
          }));
        case 25:
          _context.next = 28;
          break;
        case 27:
          return _context.abrupt("return", res.status(404).json({
            msg: "Usuario no encontrado."
          }));
        case 28:
          _context.next = 34;
          break;
        case 30:
          _context.prev = 30;
          _context.t0 = _context["catch"](3);
          console.error("Error al validar usuario:", _context.t0);
          return _context.abrupt("return", res.status(500).json({
            msg: "Error interno del servidor."
          }));
        case 34:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 30]]);
  }));
  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();