"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUsers = exports.getUsersById = exports.getUsers = exports.deleteUsers = exports.createUsers = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _connection = require("../database/connection.js");
var _queriesInterface = require("../database/queries.interface.js");
var getUsers = exports.getUsers = /*#__PURE__*/function () {
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
          return client.query(_queriesInterface.queries.users.getUsers);
        case 6:
          result = _context.sent;
          res.status(200).json(result.rows);
          _context.next = 10;
          return client.end();
        case 10:
          _context.next = 16;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Error al obtener los usuarios:', _context.t0);
          res.status(500).json({
            error: 'Error al obtener los usuarios'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getUsersById = exports.getUsersById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, client, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          if (id) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            msg: 'Por favor proporciona un ID válido.'
          }));
        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return (0, _connection.getConnection)();
        case 6:
          client = _context2.sent;
          _context2.next = 9;
          return client.query(_queriesInterface.queries.users.getUsersById, [id]);
        case 9:
          result = _context2.sent;
          _context2.next = 12;
          return client.end();
        case 12:
          if (!(result.rows.length > 0)) {
            _context2.next = 16;
            break;
          }
          return _context2.abrupt("return", res.status(200).json(result.rows[0]));
        case 16:
          return _context2.abrupt("return", res.status(404).json({
            msg: 'Usuario no encontrado.'
          }));
        case 17:
          _context2.next = 23;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](3);
          console.error('Error al obtener usuario:', _context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            msg: 'Error interno del servidor.'
          }));
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 19]]);
  }));
  return function getUsersById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var createUsers = exports.createUsers = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, name, cargo, email, phone, departament, rol, permissions, user_status, user_password, hashedPassword, client;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, cargo = _req$body.cargo, email = _req$body.email, phone = _req$body.phone, departament = _req$body.departament, rol = _req$body.rol, permissions = _req$body.permissions, user_status = _req$body.user_status, user_password = _req$body.user_password;
          if (!(!name || !email || !cargo || !phone || !departament || !rol || !permissions || !user_status || !user_password)) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            msg: 'No se permiten campos vacíos. Asegúrate de que todos los campos están completos.'
          }));
        case 3:
          _context3.prev = 3;
          _context3.next = 6;
          return _bcrypt["default"].hash(user_password, 10);
        case 6:
          hashedPassword = _context3.sent;
          _context3.next = 9;
          return (0, _connection.getConnection)();
        case 9:
          client = _context3.sent;
          _context3.next = 12;
          return client.query(_queriesInterface.queries.users.createUsers, [name, cargo, email, phone, departament, rol, permissions, user_status, hashedPassword]);
        case 12:
          _context3.next = 14;
          return client.end();
        case 14:
          return _context3.abrupt("return", res.status(201).json({
            msg: 'Usuario creado exitosamente.'
          }));
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](3);
          console.error('Error al crear usuario:', _context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            msg: 'Error interno del servidor.'
          }));
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 17]]);
  }));
  return function createUsers(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateUsers = exports.updateUsers = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _req$body2, name, cargo, email, phone, departament, rol, permissions, user_status, user_password, hashedPassword, client;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, cargo = _req$body2.cargo, email = _req$body2.email, phone = _req$body2.phone, departament = _req$body2.departament, rol = _req$body2.rol, permissions = _req$body2.permissions, user_status = _req$body2.user_status, user_password = _req$body2.user_password;
          if (!(!id || !name || !cargo || !email || !phone || !departament || !rol || !permissions || !user_status || !user_password)) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            msg: 'No se permiten campos vacíos. Asegúrate de que todos los campos están completos.'
          }));
        case 4:
          _context4.prev = 4;
          _context4.next = 7;
          return _bcrypt["default"].hash(user_password, 10);
        case 7:
          hashedPassword = _context4.sent;
          _context4.next = 10;
          return (0, _connection.getConnection)();
        case 10:
          client = _context4.sent;
          _context4.next = 13;
          return client.query(_queriesInterface.queries.users.updateUsers, [name, cargo, email, phone, departament, rol, permissions, user_status, hashedPassword, id]);
        case 13:
          _context4.next = 15;
          return client.end();
        case 15:
          return _context4.abrupt("return", res.status(201).json({
            msg: 'Usuario actualizado exitosamente.'
          }));
        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](4);
          console.error('Error al actualizar usuario:', _context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            msg: 'Error interno del servidor.'
          }));
        case 22:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 18]]);
  }));
  return function updateUsers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteUsers = exports.deleteUsers = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, client;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          if (id) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            msg: 'Por favor proporciona un ID válido.'
          }));
        case 3:
          _context5.prev = 3;
          _context5.next = 6;
          return (0, _connection.getConnection)();
        case 6:
          client = _context5.sent;
          _context5.next = 9;
          return client.query(_queriesInterface.queries.users.deleteUsers, [id]);
        case 9:
          _context5.next = 11;
          return client.end();
        case 11:
          return _context5.abrupt("return", res.status(200).json({
            msg: 'Usuario eliminado exitosamente.'
          }));
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](3);
          console.error('Error al eliminar usuario:', _context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            msg: 'Error interno del servidor.'
          }));
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 14]]);
  }));
  return function deleteUsers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();