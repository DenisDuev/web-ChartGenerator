var express = require('express');
var connection = require('./../db_connection');

module.exports.register = function(req , res) {
    var today = new Date();
    var users = {
        "username" : req.body.username,
        "password" : req.body.password,
        "create_at" : today,
        "update_at" : today
    }

    connection.query('INSERT INTO users SET ?',users, function (error, results, fields){
        if(error) {
            res.json({
                status: false,
                massage : 'There are some error with query!'
            })
        }else {
            res.json({
                status : true,
                data : results,
                massage : 'User registered sucessfully!'
            })
        }
    });
}