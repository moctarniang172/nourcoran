const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config'); // vérifie le nom exact du fichier

const erreur = (message, status) => Object.assign(new Error(message), { status });
const estTexte = (v) => typeof v === 'string' && v.trim() !== '';

exports.registre = async (data) => {
  const { nom, prenom, email, mdp } = data;

  if (![nom, prenom, email, mdp].every(estTexte)) {
    throw erreur('Veuillez remplir tous les champs !', 400);
  }
  if (mdp.length < 8 || mdp.length > 72) {
    throw erreur('Le mot de passe doit contenir entre 8 et 72 caractères.', 400);
  }

  const hashpassword = await bcrypt.hash(mdp, 10);

  try {
    await db.execute(
      'INSERT INTO users (nom, prenom, email, password_hash) VALUES (?, ?, ?, ?)',
      [nom.trim(), prenom.trim(), email.trim().toLowerCase(), hashpassword]
    );
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') throw erreur('Cet email existe déjà.', 409);
    throw err;
  }

  return { message: 'Compte créé avec succès !' };
};

exports.login = async (data) => {
  const { email, mdp } = data;

  if (!estTexte(email) || typeof mdp !== 'string' || mdp === '') {
    throw erreur('Veuillez remplir tous les champs !', 400);
  }

  const [rows] = await db.execute(
    'SELECT id, nom, prenom, email, password, role FROM users WHERE email = ?',
    [email.trim().toLowerCase()]
  );
  const user = rows[0];
  const isValide = user && (await bcrypt.compare(mdp, user.password_hash));

  if (!isValide) throw erreur('Mot de passe ou email incorrect', 401);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return { message: 'Connexion réussie !', id: user.id, nom: user.nom, role: user.role, token };
};