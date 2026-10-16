const jwt = require('jsonwebtoken');
const db = require("../config/conf.config")

const verificationToken = async(req, res, next) =>{
    const autheaders = req.hraders('authorization')

    if(!autheaders){
        return res.status(401).json({message: "Non autorisé, token manquant"})
    }
    const token = autheaders.split(' ')[1];

    try{
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await db.query("SELECT * FROM user WHERE mdp ?", )[decoder]

        

        next();

    }catch(error){
    return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
};

module.exports =  verificationToken;