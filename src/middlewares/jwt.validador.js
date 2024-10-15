import { API_KEY } from "../config/config.js"; // Importa la clave API desde el archivo de configuración
import jwt from 'jsonwebtoken'; // Importa jsonwebtoken para la verificación de tokens

/**
 * Middleware para verificar el token JWT en las solicitudes.
 */
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Obtiene el token de los encabezados de la solicitud

  if (!token) {
    return res.status(403).json({
      atención: "Acceso no autorizado" // Envía una respuesta de acceso no autorizado si no hay token
    });
  }

  jwt.verify(token, API_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "No Autorizado" // Envía una respuesta de no autorizado si hay un error al verificar el token
      });
    }

    req.user = decoded; // Decodifica el token y almacena los datos del usuario en la solicitud
    next(); // Llama al siguiente middleware o controlador
  });
};