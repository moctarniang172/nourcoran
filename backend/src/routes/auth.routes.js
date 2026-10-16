const router  = require('express').Router();

const authControllers = require("../controllers/auth.controllers");


router.post('/inscription', authControllers.register );
router.post('/connexion', authControllers.login );


module.exports = router;

