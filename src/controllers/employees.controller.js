import { getConnection } from "../database/connection.js"; // Importa la función de conexión a la base de datos
import { queries } from "../database/queries.interface.js"; // Asegúrate de que esta ruta sea correcta, Importa las consultas a la base de datos

/**
 * Obtiene todos los empleados de la base de datos.
 */
export const employees = async (req, res) => {
  try {
    const client = await getConnection(); // Obtiene una conexión a la base de datos
    const result = await client.query(queries.users.getUsers); // Ejecuta la consulta para obtener todos los empleados
    res.status(200).json(result.rows); // Envía la respuesta con los datos obtenidos
    await client.end(); // Cierra la conexión a la base de datos
  } catch (error) {
    console.error("Error al obtener todos los usuarios", error); // Muestra el error en la consola
    res.status(500).json({ error: "Error al obtener los usuarios" }); // Envía una respuesta de error
  }
};
