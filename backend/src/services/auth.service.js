const bcrypt = require('bcrypt');
const db = require("../config/conf.config");
const jwt = require('jsonwebtoken');

exports.registre = async(data) =>{
    const {nom, prenom, email, mdp} = data;
    if(!nom || !prenom || !nom || !email || !mdp) {
        throw new Error("Veuillez remplir tous les champs !")
    }

    // verifier si l'email est existe
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const userExiste = rows[0];

    if(userExiste) throw new Error("cet email existe déjà");

    const hashpassword = await bycrypt.hash(mdp, 10);

    await db.query(
        "INSERT INTO users(nom,prenom,email,mdp) VALUES(?, ?, ?, ?)",
        [nom,prenom,email,hashpassword]
    );
    return {message: "compte créé avec succès !" }
}

exports.login = async (data) => {
    const { email, mdp } = data;
    
    if (!email || !mdp) {
        throw new Error("Veuillez remplir tous les champs !");
    }

    // CORRECTION : On déstructure correctement [rows] pour récupérer le tableau des résultats
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0]; // Ici, user est bien l'objet de l'utilisateur

    if (!user) {
        throw new Error("Mot de passe ou email incorrect");
    }

   

    const isValide = await bcrypt.compare(mdp, user.mdp);
    
    if (!isValide) {
        throw new Error("Mot de passe ou email incorrect");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return { 
        message: "Connexion réussie !", 
        id: user.id, 
        nom: user.nom, 
        token 
    };
};