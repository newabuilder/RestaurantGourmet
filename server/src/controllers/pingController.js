const connection = require('../models/database.js')





module.exports.ping = (req,res) =>{
    const consult = 'SELECT * FROM usuarios';


    try {
        connection.query(consult, (err, results) => {
            console.log((results))
            res.json(results)
        })
    } catch (err) {
        
    }
}