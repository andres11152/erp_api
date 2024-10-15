import { getConnection } from "../database/connection.js"; // Importa la función de conexión a la base de datos
import { queries } from "../database/queries.interface.js"; // Importa las consultas a la base de datos

/**
 * Obtiene el conteo total de usuarios de la base de datos.
 */
export const getUsersCount = async (req, res) => {
  try {
    const client = await getConnection(); // Obtiene una conexión a la base de datos
    const result = await client.query(queries.menu.countUsers); // Ejecuta la consulta para obtener el conteo de usuarios
    res.status(200).json({ count: result.rows[0].count }); // Envía la respuesta como un objeto JSON con el conteo de usuarios
    await client.end(); // Cierra la conexión a la base de datos
  } catch (error) {
    console.error("Error al obtener el conteo de usuarios", error); // Muestra el error en la consola
    res.status(500).json({ error: "Error al obtener el conteo de usuarios" }); // Envía una respuesta de error
  }
};
