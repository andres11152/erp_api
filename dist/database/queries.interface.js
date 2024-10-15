"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;
var queries = exports.queries = {
  menu: {
    countUsers: 'SELECT COUNT(*) FROM users'
  },
  users: {
    getUsers: 'SELECT * FROM users',
    getUsersById: 'SELECT * FROM users WHERE id = $1',
    createUsers: "INSERT INTO users (name, cargo, email, phone, departament, rol, permissions, user_status, user_password) \n                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    deleteUsers: 'DELETE FROM users WHERE id = $1',
    updateUsers: "UPDATE users SET \n                        name = $1, cargo = $2, email = $3, phone = $4, departament = $5, \n                        rol = $6, permissions = $7, user_status = $8, user_password = $9 \n                      WHERE id = $10"
  },
  clients: {},
  humanResources: {},
  contability: {},
  financial: {},
  inventory: {},
  sales: {},
  marketing: {},
  procurement: {}
};