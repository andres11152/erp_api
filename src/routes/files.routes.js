// Importa el módulo express para crear la aplicación y manejar las rutas.
import express from "express";

// Importa las funciones addArlFile y getArlFile desde el controlador de archivos.
import { addArlFile, getArlFile } from "../controllers/files.controller.js";

// Importa el middleware de carga de archivos.
import upload from "../middlewares/uploads.js";

// Crea una nueva instancia de Router.
const router = express.Router();

// Define una ruta POST para '/api/add'.
// El middleware 'upload.single('file')' se usa para manejar la carga de un único archivo.
// La función 'addArlFile' en el controlador se ejecuta después de que el archivo ha sido cargado.
router.post("/api/add", upload.single('file'), addArlFile);

// Define una ruta GET para '/api/get'.
// La función 'getArlFile' en el controlador se ejecuta cuando se hace una solicitud GET a esta ruta.
router.get("/api/get", getArlFile);

// Exporta el router para que pueda ser utilizado en otras partes de la aplicación.
export default router;
