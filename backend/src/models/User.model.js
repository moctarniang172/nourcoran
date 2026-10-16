const db = require("../config/conf.config");

const tableUser = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    mdp VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createTableUser = async () => {
    try {
        await db.query(tableUser);
        console.log('Table users créée avec succès');
    } catch (error) {
        console.log({ message: error.message });
    }
};

// Pense à appeler cette fonction quelque part si tu veux que la table se crée automatiquement au lancement, 
// ou garde-la pour l'exécuter quand tu en as besoin.

module.exports = { createTableUser };