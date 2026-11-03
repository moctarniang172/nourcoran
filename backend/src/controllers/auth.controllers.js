const authServices = require('../services/auth.service');

const repondreErreur = (res, error) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  console.error(error);
  return res.status(500).json({ message: 'Erreur serveur.' });
};

exports.register = async (req, res) => {
  try {
    const result = await authServices.registre(req.body);
    res.status(201).json(result);
  } catch (error) {
    repondreErreur(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authServices.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    repondreErreur(res, error);
  }
};