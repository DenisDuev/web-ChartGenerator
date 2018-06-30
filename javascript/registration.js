var express = require('express');
var connection = require('../server');

module.exports.register = function (req, res) {

    //INSERT INTO `users`(`username`, `password`, `created_at`, `updated_at`) VALUES ('asd','asd','asd','asd')
    var sql = 'INSERT INTO `users` (`username`, `password`, `created_at`,`updated_at`) VALUES (?, ?, ?, ?)';
    var today = new Date();
    //console.log(connection);
    connection.query(sql, [req.body.username, req.body._password, today, today], function (error, results, fields) {
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