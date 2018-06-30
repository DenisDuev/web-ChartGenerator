var connection = require('./../server');

module.exports.authenticate = function (req, res) {
    //let username = req.body.username;
    //let password = req.body.password;

    //console.log(username);
    console.log(req.body);
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?',['asd', 'asd'], function (error, results, fields) {
        if(error) {
            res.json({
                status : false,
                massage : 'There are some error with query!'
            })
        }else {
            if(results.length > 0) {
                //console.log(results);
                res.write(JSON.stringify({
                    status : true,
                    massage : 'Successfully authenticated!'}));
                res.end();
            }else {
                console.log(results);
                res.json({
                    status : false,
                    massage : 'User does not exits!'
                });
            }
        }
    });
}