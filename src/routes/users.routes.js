// Importa el objeto Router de Express, que se utiliza para definir rutas en la aplicación.
import { Router } from 'express';

// Importa las funciones del controlador users.controller.js.
// Estas funciones manejarán las solicitudes a las rutas correspondientes.
import { getUsers, getUsersById, createUsers, deleteUsers, updateUsers } from '../controllers/users.controller.js';

// Crea una nueva instancia de Router.
const router = Router();

// Define una ruta GET para obtener la lista de usuarios.
// Cuando se hace una solicitud GET a '/api/users', se ejecuta la función 'getUsers' del controlador.
router.get('/api/users', getUsers);

// Define una ruta GET para obtener un usuario por su ID.
// Cuando se hace una solicitud GET a '/api/usersbyid/:id', se ejecuta la función 'getUsersById' del controlador.
router.get('/api/usersbyid/:id', getUsersById);

// Define una ruta POST para crear un nuevo usuario.
// Cuando se hace una solicitud POST a '/api/createusers', se ejecuta la función 'createUsers' del controlador.
router.post('/api/createusers', createUsers);

// Define una ruta PUT para actualizar un usuario por su ID.
// Cuando se hace una solicitud PUT a '/api/updateusers/:id', se ejecuta la función 'updateUsers' del controlador.
router.put('/api/updateusers/:id', updateUsers);

// Define una ruta DELETE para eliminar un usuario por su ID.
// Cuando se hace una solicitud DELETE a '/api/deleteusers/:id', se ejecuta la función 'deleteUsers' del controlador.
router.delete('/api/deleteusers/:id', deleteUsers);

// Exporta el router para que pueda ser utilizado en otras partes de la aplicación.
export default router;
