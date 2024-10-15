import pg from 'pg'; // Importa el módulo pg para manejar la conexión a PostgreSQL
import { dbSettings } from '../config/config.js'; // Importa la configuración de la base de datos desde el archivo de configuración

const { Client } = pg; // Extrae la clase Client del módulo pg

/**
 * Establece una conexión a la base de datos y la devuelve.
 * @returns {Promise<Client>} - El cliente de la base de datos conectado
 */
export const getConnection = async () => {
  const client = new Client(dbSettings); // Crea una nueva instancia del cliente de la base de datos con la configuración proporcionada

  try {
    await client.connect(); // Intenta conectar el cliente a la base de datos
    console.log('Conexión a la base de datos establecida'); // Log para confirmar conexión exitosa
    return client; // Devuelve el cliente conectado
  } catch (error) {
    console.error('Error conectando a la base de datos:', error.message); // Muestra el error en la consola si falla la conexión
    throw error; // Lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};

// Bloque de prueba para verificar la conexión
getConnection()
  .then((client) => {
    console.log('Conexión exitosa a la base de datos'); // Si la conexión es exitosa, muestra este mensaje
    return client.end(); // Cierra la conexión después de probar
  })
  .catch((error) => {
    console.error('Error en la conexión:', error.message); // Si hay un error en la conexión, muestra el mensaje de error
  });
