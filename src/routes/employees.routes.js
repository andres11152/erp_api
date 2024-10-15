// Importa el objeto Router de Express, que se utiliza para definir rutas en la aplicación.
import { Router } from 'express';

// Importa el controlador de empleados, que contiene las funciones que manejarán las solicitudes a las rutas de empleados.
import { employees } from '../controllers/employees.controller.js';

// Crea una nueva instancia de Router.
const router = Router();

// Define una ruta GET para la URL '/api/employees'. Cuando esta ruta es solicitada, se ejecuta la función 'employees' del controlador.
router.get('/api/employees', employees);

// Exporta el router para que pueda ser utilizado en otras partes de la aplicación.
export default router;
