const connection = require('../models/database.js')

module.exports.login = (req, res) =>{

    const {email, password} = req.body;
 

    const consult = 'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?';

    try {
        connection.query(consult, [email, password], (err, result)=>{
            if(err){
              return res.send(err);
            }
            if(result.length>0){
                console.log(result);
                return res.send('si existe');
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
