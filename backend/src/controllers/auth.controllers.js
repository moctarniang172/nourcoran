const authServices = require('../services/auth.service');

exports.register = async (req, res) => {
    try{
        const result = await authServices.registre(req.body)
        res.status(201).json(result)

    }catch(error){
        res.status(400).json({message: error.message});

    };

}

exports.login = async (req,res) => {
    try{
        const result = await authServices.login(req.body);
        res.status(200).json(result);

    }catch(error){
        res.status(400).json({message: error.message});

    }

}