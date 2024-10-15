// Importa el objeto Router de Express, que se utiliza para definir rutas en la aplicación.
import { Router } from 'express';

// Importa las funciones del controlador commercialController.js.
// Estas funciones manejarán las solicitudes a las rutas correspondientes.
import { createCommercial, getAllCommercials, getCommercialById, updateCommercial, deleteCommercial } from '../controllers/commercials.controller.js';


// Crea una nueva instancia de Router.
const router = Router();

// Define una ruta GET para obtener la lista de registros en la tabla Commercial.
// Cuando se hace una solicitud GET a '/api/commercials', se ejecuta la función 'getAllCommercials' del controlador.
router.get('/api/commercials', getAllCommercials);

// Define una ruta GET para obtener un registro de la tabla Commercial por su ID.
// Cuando se hace una solicitud GET a '/api/commercials/:id', se ejecuta la función 'getCommercialById' del controlador.
router.get('/api/commercials/:id', getCommercialById);

// Define una ruta POST para crear un nuevo registro en la tabla Commercial.
// Cuando se hace una solicitud POST a '/api/commercials', se ejecuta la función 'createCommercial' del controlador.
router.post('/api/commercials', createCommercial);

// Define una ruta PUT para actualizar un registro de la tabla Commercial por su ID.
// Cuando se hace una solicitud PUT a '/api/commercials/:id', se ejecuta la función 'updateCommercial' del controlador.
router.put('/api/commercials/:id', updateCommercial);

// Define una ruta DELETE para eliminar un registro de la tabla Commercial por su ID.
// Cuando se hace una solicitud DELETE a '/api/commercials/:id', se ejecuta la función 'deleteCommercial' del controlador.
router.delete('/api/commercials/:id', deleteCommercial);

// Exporta el router para que pueda ser utilizado en otras partes de la aplicación.
export default router;
