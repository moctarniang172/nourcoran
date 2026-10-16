const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Corrigé de db_port à port
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

pool.getConnection((err, connexion) => {
    if (err) {
        console.error("Erreur de la connexion DB:", err);
        return;
    }
    console.log("Base de données connectée");
    connexion.release();
});

module.exports = pool.promise();