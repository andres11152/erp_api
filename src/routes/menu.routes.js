// Importa el objeto Router de Express, que se utiliza para definir rutas en la aplicación.
import { Router } from "express";

// Importa la función getUsersCount del controlador menu.controller.js.
import { getUsersCount } from "../controllers/menu.controller.js";

// Importa el middleware verifyToken desde jwt.validador.js, que se utilizará para verificar tokens JWT.
import { verifyToken } from "../middlewares/jwt.validador.js";

// Crea una nueva instancia de Router.
const router = Router();

// Define una ruta GET para la URL '/api/userscount'.
// El middleware 'verifyToken' se utiliza para verificar el token JWT antes de permitir el acceso a la ruta.
// La función 'getUsersCount' del controlador se ejecuta si la verificación del token es exitosa.
router.get("/api/userscount", verifyToken, getUsersCount);

// Exporta el router para que pueda ser utilizado en otras partes de la aplicación.
export default router;
