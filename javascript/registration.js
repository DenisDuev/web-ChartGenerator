var express = require('express');
var connection = require('../server');

module.exports.register = function (req, res) {

    //INSERT INTO `users`(`username`, `password`, `created_at`, `updated_at`) VALUES ('asd','asd','asd','asd')
    var sql = 'INSERT INTO `users` (`username`, `password`, `created_at`,`updated_at`) VALUES (?, ?, ?, ?)';
    var today = new Date();

    //console.log(connection);
    connection.query(sql, [req.body.username, req.body.password, today, today], function (error, results, fields) {
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
}