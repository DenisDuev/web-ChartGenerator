var express = require('express');
var connection = require('../server');

module.exports.register = function (req, res) {

    //INSERT INTO `users`(`username`, `password`, `created_at`, `updated_at`) VALUES ('asd','asd','asd','asd')
    var sql = 'INSERT INTO `users` (`username`, `password`, `created_at`,`updated_at`) VALUES (?, ?, ?, ?)';
    var today = new Date();

    var username = req.body.username;

    connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                massage: 'There are some error with query!'
            })
        }
        if(!results.length) {
            //console.log(connection);
            connection.query(sql, [username, req.body.password, today, today], function (error, results, fields) {
                if (error) {
                    console.log(error);
                    res.write(JSON.stringify({
                        status: false,
                        massage: 'There are some error with query!'
                    }));
                    res.end();
                } else {
                    res.write(JSON.stringify({
                        status: true,
                        data: results,
                        massage: 'User registered successfully!'
                    }));
                    res.end();
                }
            });
        } else {
            console.log(results);
                res.json(JSON.stringify({
                    status: false,
                    massage: 'User already exists!'
            }));
            res.end();
        }
    });
};
