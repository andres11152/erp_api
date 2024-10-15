"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _config = require("./config/config.js");
var _usersRoutes = _interopRequireDefault(require("../src/routes/users.routes.js"));
var _menuRoutes = _interopRequireDefault(require("../src/routes/menu.routes.js"));
var _employeesRoutes = _interopRequireDefault(require("../src/routes/employees.routes.js"));
var _filesRoutes = _interopRequireDefault(require("../src/routes/files.routes.js"));
//Configuración del servidor
var app = (0, _express["default"])();

//importación de las rutas

//Middleware
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cors["default"])());

//Rutas
app.use(_usersRoutes["default"]);
app.use(_menuRoutes["default"]);
app.use(_employeesRoutes["default"]);
app.use(_filesRoutes["default"]);

//configuración del servidor
app.get('/', function (req, res) {
  res.render(process.cwd() + '/web/index.ejs');
});
var server = app.listen(_config.PORT, function () {
  var host = "http://localhost:".concat(_config.PORT);
  console.log("Servidor corriendo en: ".concat(host));
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});
process.on('SIGINT', function () {
  server.close(function () {
    console.log('Servidor cerrado correctamente');
    process.exit(0);
  });
});