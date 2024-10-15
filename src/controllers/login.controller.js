import bcrypt from "bcrypt"; // Importa bcrypt para el hashing de contraseñas
import jwt from "jsonwebtoken"; // Importa jsonwebtoken para la generación de tokens
import { getConnection } from "../database/connection.js"; // Importa la función de conexión a la base de datos
import { queries } from "../database/queries.interface.js"; // Asegúrate de que esta ruta sea correcta, Importa las consultas a la base de datos
import { API_KEY } from "../config.js"; // Asegúrate de que esta ruta sea correcta y que `API_KEY` esté definido

/**
 * Autentica un usuario y genera un token JWT.
 */
export const login = async (req, res) => {
  const { email, password } = req.body; // Obtiene el correo electrónico y la contraseña del cuerpo de la solicitud

  if (!email || !password) {
    return res.status(400).json({
      msg: "Por favor proporciona un correo electrónico y una contraseña válidas.", // Valida que no haya campos vacíos
    });
  }

  try {
    const client = await getConnection(); // Obtiene una conexión a la base de datos
    const result = await client.query(queries.users.getUsersByEmail, [email]); // Ejecuta la consulta para obtener un usuario por correo electrónico
    await client.end(); // Cierra la conexión a la base de datos

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.user_password); // Compara la contraseña proporcionada con la almacenada

      if (passwordMatch) {
        const token = await jwt.sign(
          {
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol,
            permissions: user.permissions,
          },
          API_KEY // Firma el token con la clave API
        );

        return res.status(200).json({
          token: token, // Envía el token generado
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol,
            permissions: user.permissions,
          },
        });
      } else {
        return res.status(401).json({
          msg: "Correo electrónico o contraseña incorrectos.", // Envía una respuesta de error si la contraseña no coincide
        });
      }
    } else {
      return res.status(404).json({
        msg: "Usuario no encontrado.", // Envía una respuesta de error si el usuario no se encuentra
      });
    }
  } catch (error) {
    console.error("Error al validar usuario:", error); // Muestra el error en la consola
    return res.status(500).json({
      msg: "Error interno del servidor.", // Envía una respuesta de error
    });
  }
};
