export const queries = {
    menu: {
        countUsers: 'SELECT COUNT(*) FROM users',
    },
    users: {
      getUsers: 'SELECT * FROM users',
      getUsersById: 'SELECT * FROM users WHERE id = $1',
      createUsers: `INSERT INTO users (user_name, name, cargo, email, phone, departament, rol, permissions, user_status, user_password)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      updateUsers: `UPDATE users
                     SET name = $1, cargo = $2, email = $3, phone = $4, departament = $5, rol = $6, permissions = $7, user_status = $8, user_password = $9
                     WHERE id = $10`,
      deleteUsers: 'DELETE FROM users WHERE id = $1'
    },
    commercial: {
        createCommercial: `
            INSERT INTO Commercial (id, tax_id, company_name, address, main_phone)
            VALUES (uuid_generate_v4(), $1, $2, $3, $4)
            RETURNING *;
        `,
        getAllCommercials: `
            SELECT * FROM Commercial;
        `,
        getCommercialById: `
            SELECT * FROM Commercial WHERE id = $1;
        `,
        updateCommercial: `
            UPDATE Commercial 
            SET tax_id = $1, company_name = $2, address = $3, main_phone = $4
            WHERE id = $5
            RETURNING *;
        `,
        deleteCommercial: `
            DELETE FROM Commercial WHERE id = $1
            RETURNING *;
        `,
    },
    clients: {
        // Add client-related queries here
    },
    humanResources: {
        // Add HR-related queries here
    },
    contability: {
        // Add contability-related queries here
    },
    financial: {
        // Add financial-related queries here
    },
    inventory: {
        // Add inventory-related queries here
    },
    sales: {
        // Add sales-related queries here
    },
    marketing: {
        // Add marketing-related queries here
    },
    procurement: {
        // Add procurement-related queries here

    }

}
