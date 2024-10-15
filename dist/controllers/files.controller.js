"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArlFile = exports.addArlFile = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _connection = require("../database/connection.js");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
//
var addArlFile = exports.addArlFile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, file_name, validated_status, employee_id, doc_file, filePath, fileBuffer, client, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, file_name = _req$body.file_name, validated_status = _req$body.validated_status, employee_id = _req$body.employee_id;
          doc_file = req.file;
          if (!(!file_name || !doc_file || validated_status === undefined || !employee_id)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Faltan datos requeridos"
          }));
        case 4:
          _context.prev = 4;
          filePath = _path["default"].resolve(doc_file.path); // Ruta absoluta al archivo
          console.log("Leyendo archivo desde: ".concat(filePath));
          fileBuffer = _fs["default"].readFileSync(filePath);
          _context.next = 10;
          return (0, _connection.getConnection)();
        case 10:
          client = _context.sent;
          console.log("Conexión a la base de datos establecida");
          _context.next = 14;
          return client.query("INSERT INTO arl_afiliation (file_name, doc_file, validated_status, employee_id) VALUES ($1, $2, $3, $4)", [file_name, fileBuffer, validated_status, employee_id]);
        case 14:
          result = _context.sent;
          console.log("Archivo insertado en la base de datos");
          _fs["default"].unlinkSync(filePath); // Elimina el archivo después de leerlo
          console.log("Archivo eliminado: ".concat(filePath));
          _context.next = 20;
          return client.end();
        case 20:
          res.status(200).json({
            msg: "Archivo subido correctamente"
          });
          _context.next = 27;
          break;
        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](4);
          console.error("Error al subir archivo:", _context.t0);
          res.status(500).json({
            error: "Error al subir archivo"
          });
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 23]]);
  }));
  return function addArlFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getArlFile = exports.getArlFile = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var employee_id, client, result, fileRow, fileBuffer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          employee_id = req.query.employee_id;
          if (employee_id) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: "Falta el id de usuario"
          }));
        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return (0, _connection.getConnection)();
        case 6:
          client = _context2.sent;
          _context2.next = 9;
          return client.query("SELECT * FROM arl_afiliation WHERE employee_id = $1", [employee_id]);
        case 9:
          result = _context2.sent;
          if (!(result.rows.length === 0)) {
            _context2.next = 14;
            break;
          }
          _context2.next = 13;
          return client.end();
        case 13:
          return _context2.abrupt("return", res.status(404).json({
            error: "No se encontró el archivo"
          }));
        case 14:
          fileRow = result.rows[0];
          fileBuffer = fileRow.doc_file;
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', "attachment; filename=".concat(fileRow.file_name));
          res.send(fileBuffer);
          _context2.next = 21;
          return client.end();
        case 21:
          _context2.next = 27;
          break;
        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](3);
          console.error("Error al obtener los archivos", _context2.t0);
          res.status(500).json({
            error: "Error al obtener los archivos"
          });
        case 27:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 23]]);
  }));
  return function getArlFile(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();