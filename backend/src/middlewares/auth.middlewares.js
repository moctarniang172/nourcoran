const jwt = require('jsonwebtoken');
const db = require("../config/conf.config")

const verificationToken = async(req, res, next) =>{
    const autheaders = req.headers('authorization')

    if(!autheaders){
        return res.status(401).json({message: "Non autorisé, token manquant"})
    }
    const token = autheaders.split(' ')[1];

    try{
        const decoder = jwt.verify(token, process.env.JWT_SECRET);

       const [rows] = await db.query("SELECT id, nom, prenom, email FROM users WHERE id = ?", [decoder.id]);
       const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }
        
        req.user = user

        next();

    }catch(error){
    return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
};

module.exports =  verificationToken;