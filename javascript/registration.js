var express = require('express');
var connection = require('../server');

module.exports.register = function (req, res) {

    //INSERT INTO `users`(`username`, `password`, `created_at`, `updated_at`) VALUES ('asd','asd','asd','asd')
    var sql = "INSERT INTO 'users' ('username', 'password', 'created_at', 'updated_at') VALUES ?";
    var today = new Date();
    var users = [
        ['denis',//req.body.username,
            'asd',//req.body.password,
            today,
            today],
        ['asfasfasf',//req.body.username,
            'asasfasfad',//req.body.password,
            today,
            today],
    ];
    //console.log(connection);
    connection.query(sql, [users], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.json({
                status: false,
                massage: 'There are some error with query!'
            })
        } else {
            res.json({
                status: true,
                data: results,
                massage: 'User registered successfully!'
            })
        }
    });
}