var connection = require('./../db_connection');

module.exports.authenticate = function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    connection.query('SELECT * FROM users WHERE username = ?',[username], function (error, results, fields) {
        if(error) {
            res.json({
                status : false,
                massage : 'There are some error with query!'
            })
        }else {
            if(results.length > 0) {
                if(password == results[0].password){
                    res.json({
                        status : true,
                        massage : 'Successfully authenticated!'
                    })
                }else {
                    res.json({
                        status : false,
                        massage : 'User and password does not match!'
                    });
                }
            }else {
                res.json({
                    status : false,
                    massage : 'User does not exits!'
                });
            }
        }
    });
}