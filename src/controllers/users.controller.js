import bcrypt from 'bcrypt'; // Importa bcrypt para el hashing de contraseñas
import { getConnection } from '../database/connection.js'; // Importa la función de conexión a la base de datos
import { queries } from '../database/queries.interface.js'; // Importa las consultas a la base de datos

/**
 * Obtiene todos los usuarios de la base de datos.
 */
export const getUsers = async (req, res) => {
  try {
    const client = await getConnection(); // Obtiene una conexión a la base de datos.
    const result = await client.query(queries.users.getUsers); // Ejecuta la consulta para obtener todos los usuarios
    res.status(200).json(result.rows); // Envía la respuesta con los datos obtenidos
    await client.end(); // Cierra la conexión a la base de datos
  } catch (error) {
    console.error('Error al obtener los usuarios:', error); // Muestra el error en la consola
    res.status(500).json({ error: 'Error al obtener los usuarios' }); // Envía una respuesta de error
  }
};

/**
 * Obtiene un usuario por ID de la base de datos.
 */
export const getUsersById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      msg: 'Por favor proporciona un ID válido.', // Valida que el ID esté presente
    });
  }

  try {
    const client = await getConnection(); // Obtiene una conexión a la base de datos
    const result = await client.query(queries.users.getUsersById, [id]); // Ejecuta la consulta para obtener un usuario por ID
    await client.end(); // Cierra la conexión a la base de datos
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]); // Envía la respuesta con el usuario encontrado
    } else {
      return res.status(404).json({
        msg: 'Usuario no encontrado.', // Envía una respuesta si no se encuentra el usuario
      });
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error); // Muestra el error en la consola
    return res.status(500).json({
      msg: 'Error interno del servidor.', // Envía una respuesta de error
    });
  }
};

/**
 * Crea un nuevo usuario en la base de datos.
 */
export const createUsers = async (req, res) => {
  const { user_name, name, cargo, email, phone, departament, rol, permissions, user_status, user_password } = req.body;

  if (!user_name || !name || !email || !cargo || !phone || !departament || !rol || !permissions || !user_status || !user_password) {
    return res.status(400).json({
      msg: 'No se permiten campos vacíos. Asegúrate de que todos los campos están completos.', // Valida que no haya campos vacíos
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(user_password, 10); // Hashea la contraseña del usuario
    const client = await getConnection(); // Obtiene una conexión a la base de datos
    await client.query(queries.users.createUsers, [user_name, name, cargo, email, phone, departament, rol, permissions, user_status, hashedPassword]); // Ejecuta la consulta para crear un nuevo usuario
    await client.end(); // Cierra la conexión a la base de datos
    return res.status(201).json({
      msg: 'Usuario creado exitosamente.', // Envía una respuesta de éxito
    });
  } catch (error) {
    console.error('Error al crear usuario:', error); // Muestra el error en la consola
    return res.status(500).json({
      msg: 'Error interno del servidor.', // Envía una respuesta de error
    });
  }
};

/**
 * Actualiza un usuario existente en la base de datos.
 */
export const updateUsers = async (req, res) => {
  const { id } = req.params;
  const { name, cargo, email, phone, departament, rol, permissions, user_status, user_password } = req.body;

  if (!id || !name || !cargo || !email || !phone || !departament || !rol || !permissions || !user_status || !user_password) {
    return res.status(400).json({
      msg: 'No se permiten campos vacíos. Asegúrate de que todos los campos están completos.', // Valida que no haya campos vacíos
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(user_password, 10); // Hashea la contraseña del usuario
    const client = await getConnection(); // Obtiene una conexión a la base de datos
    await client.query(queries.users.updateUsers, [name, cargo, email, phone, departament, rol, permissions, user_status, hashedPassword, id]); // Ejecuta la consulta para actualizar un usuario existente
    await client.end(); // Cierra la conexión a la base de datos
    return res.status(201).json({
      msg: 'Usuario actualizado exitosamente.', // Envía una respuesta de éxito
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error); // Muestra el error en la consola
    return res.status(500).json({
      msg: 'Error interno del servidor.', // Envía una respuesta de error
    });
  }
};

/**
 * Elimina un usuario de la base de datos.
 */
export const deleteUsers = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      msg: 'Por favor proporciona un ID válido.', // Valida que el ID esté presente
    });
  }

  try {
    const client = await getConnection(); // Obtiene una conexión a la base de datos
    await client.query(queries.users.deleteUsers, [id]); // Ejecuta la consulta para eliminar un usuario
    await client.end(); // Cierra la conexión a la base de datos
    return res.status(200).json({
      msg: 'Usuario eliminado exitosamente.', // Envía una respuesta de éxito
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error); // Muestra el error en la consola
    return res.status(500).json({
      msg: 'Error interno del servidor.', // Envía una respuesta de error
    });
  }
};