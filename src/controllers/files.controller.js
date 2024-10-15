
import { getConnection } from "../database/connection.js"; // Importa la función de conexión a la base de datos
import fs from "fs"; // Importa el módulo de sistema de archivos
import path from "path"; // Importa el módulo de manejo de rutas
/**
 * Sube un archivo ARL a la base de datos.
 */
export const addArlFile = async (req, res) => {
  const { file_name, validated_status, employee_id } = req.body;
  const doc_file = req.file;

  if (!file_name || !doc_file || validated_status === undefined || !employee_id) {
    return res.status(400).json({ error: "Faltan datos requeridos" }); // Valida que no haya campos vacíos
  }

  try {
    const filePath = path.resolve(doc_file.path); // Obtiene la ruta absoluta del archivo
    console.log(`Leyendo archivo desde: ${filePath}`);
    
    const fileBuffer = fs.readFileSync(filePath); // Lee el archivo en un buffer
    
    const client = await getConnection(); // Obtiene una conexión a la base de datos
    console.log("Conexión a la base de datos establecida");
    
    const result = await client.query(
      "INSERT INTO arl_afiliation (file_name, doc_file, validated_status, employee_id) VALUES ($1, $2, $3, $4)",
      [file_name, fileBuffer, validated_status, employee_id]
    ); // Inserta el archivo en la base de datos
    console.log("Archivo insertado en la base de datos");

    fs.unlinkSync(filePath); // Elimina el archivo después de leerlo
    console.log(`Archivo eliminado: ${filePath}`);

    await client.end(); // Cierra la conexión a la base de datos
    res.status(200).json({ msg: "Archivo subido correctamente" }); // Envía una respuesta de éxito
  } catch (error) {
    console.error("Error al subir archivo:", error); // Muestra el error en la consola
    res.status(500).json({ error: "Error al subir archivo" }); // Envía una respuesta de error
  }
};

/**
 * Obtiene un archivo ARL de la base de datos.
 */
export const getArlFile = async (req, res) => {
  const { employee_id } = req.query;

  if (!employee_id) {
    return res.status(400).json({ error: "Falta el id de usuario" }); // Valida que el ID esté presente
  }

  try {
    const client = await getConnection(); // Obtiene una conexión a la base de datos
    const result = await client.query("SELECT * FROM arl_afiliation WHERE employee_id = $1", [employee_id]); // Ejecuta la consulta para obtener el archivo

    if (result.rows.length === 0) {
      await client.end(); // Cierra la conexión a la base de datos
      return res.status(404).json({ error: "No se encontró el archivo" }); // Envía una respuesta si no se encuentra el archivo
    }

    const fileRow = result.rows[0];
    const fileBuffer = fileRow.doc_file; // Obtiene el archivo de la base de datos

    res.setHeader('Content-Type', 'application/pdf'); // Establece el tipo de contenido
    res.setHeader('Content-Disposition', `attachment; filename=${fileRow.file_name}`); // Establece la disposición del contenido
    res.send(fileBuffer); // Envía el archivo al cliente

    await client.end(); // Cierra la conexión a la base de datos
  } catch (error) {
    console.error("Error al obtener los archivos", error); // Muestra el error en la consola
    res.status(500).json({ error: "Error al obtener los archivos" }); // Envía una respuesta de error
  }
};