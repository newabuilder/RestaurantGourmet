const connection = require('../models/database.js')
const jwt = require('jsonwebtoken')

module.exports.login = (req, res) =>{

    const {email, password} = req.body;


    const consult = 'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?';

    try {
        connection.query(consult, [email, password], (err, result)=>{
            if(err){
                return res.send(err);
            }
            if(result.length>0){

                const token = jwt.sign({email}, "Stack",{
                    expiresIn: '3m'
                });

                return res.send({token});
            }
            else{
                console.log('Usuario equivocado');
                return res.send({message:'Usuario equivocado'})
            }
        })
    } catch (err) {
        return console.error(err);
    }
};
