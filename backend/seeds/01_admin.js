const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans .env');
  }

  const existant = await knex('users').where({ email }).first();
  if (existant) {
    console.log('Compte admin déjà présent');
    return;
  }

  const password_hash = await bcrypt.hash(password, 12);

  await knex('users').insert({
    nom: 'Admin',
    prenom: 'Plateforme',
    email: email,
    password: password_hash,
    role: 'admin',
  });

  console.log('Compte admin créé.');
};