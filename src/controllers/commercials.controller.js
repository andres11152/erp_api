import { getConnection } from "../database/connection.js";
import { queries } from "../database/queries.interface.js";

// Crear un nuevo registro en Commercial
export const createCommercial = async (req, res) => {
    const { tax_id, company_name, address, main_phone } = req.body;
    try {
        const connection = await getConnection();
        const result = await connection.query(
            queries.createCommercial,
            [tax_id, company_name, address, main_phone]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el registro en Commercial.' });
    }
};

// Obtener todos los registros de Commercial
export const getAllCommercials = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(queries.getAllCommercials);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los registros de Commercial.' });
    }
};

// Obtener un registro de Commercial por ID
export const getCommercialById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        const result = await connection.query(queries.getCommercialById, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Registro no encontrado en Commercial.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el registro de Commercial.' });
    }
};

// Actualizar un registro en Commercial
export const updateCommercial = async (req, res) => {
    const { id } = req.params;
    const { tax_id, company_name, address, main_phone } = req.body;
    try {
        const connection = await getConnection();
        const result = await connection.query(
            queries.updateCommercial,
            [tax_id, company_name, address, main_phone, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Registro no encontrado en Commercial.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el registro en Commercial.' });
    }
};

// Eliminar un registro de Commercial
export const deleteCommercial = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        const result = await connection.query(queries.deleteCommercial, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Registro no encontrado en Commercial.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el registro de Commercial.' });
    }
};
