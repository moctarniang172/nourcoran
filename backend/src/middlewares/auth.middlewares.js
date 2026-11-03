const jwt = require('jsonwebtoken');
const db = require('../config/db.config'); // même chemin que dans le service

const verificationToken = async (req, res, next) => {
  const [type, token] = (req.headers.authorization || '').split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Non autorisé, token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [rows] = await db.execute(
      'SELECT id, nom, prenom, email, role FROM users WHERE id = ?',
      [decoded.id]
    );
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

module.exports = verificationToken;