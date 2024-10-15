// Importación de módulos y configuración del servidor

import express from 'express'; // Importa el módulo Express para crear la aplicación y manejar las rutas.
import morgan from 'morgan'; // Importa el middleware Morgan para el registro de solicitudes HTTP.
import cors from 'cors'; // Importa el middleware CORS para permitir solicitudes desde otros dominios.
import { PORT } from './config/config.js'; // Importa la configuración del puerto desde el archivo config.js.

// Configuración del servidor
const app = express();


//importación de las rutas
import userRoutes from './routes/users.routes.js'
import menuRoutes from './routes/menu.routes.js'
import employeesRoutes from './routes/employees.routes.js'
import fileRoutes from './routes/files.routes.js'
import commercialRoutes from './routes/commercials.routes.js'


// Middleware
app.use(morgan('dev')); // Registra las solicitudes HTTP en la consola.
app.use(express.json()); // Parsea las solicitudes JSON entrantes.
app.use(express.urlencoded({ extended: false })); // Parsea las solicitudes URL-encoded.
app.use(cors()); // Habilita CORS para permitir solicitudes desde otros dominios.


//Rutas
app.use(userRoutes);
app.use(menuRoutes);
app.use(employeesRoutes);
app.use(fileRoutes);
app.use(commercialRoutes);

// Configuración del servidor - Ruta principal

app.get('/', (req, res) => {
  res.render(process.cwd() + '/web/index.ejs'); // Renderiza el archivo index.ejs al acceder a la ruta raíz.
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack); // Muestra el stack trace del error en la consola.
  res.status(500).send('Error interno del servidor'); // Responde con un mensaje de error 500.
});

// Inicialización del servidor
const server = app.listen(PORT, () => {
  const host = `http://localhost:${PORT}`;
  console.log(`Servidor corriendo en: ${host}`); // Muestra en consola que el servidor está corriendo y en qué URL.
});

// Manejo de señal de terminación (SIGINT)
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Servidor cerrado correctamente'); // Muestra en consola que el servidor se ha cerrado correctamente.
    process.exit(0); // Termina el proceso de Node.js.
  });
});