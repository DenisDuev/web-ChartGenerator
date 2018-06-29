const express = require('express');
const mysql = require('mysql');
const app = express();

// Create connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mydb'
});

// Connect
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
    });
    module.exports = connection; 
    

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE mydb';
    connection.query(sql, (err, result, fields) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create table
app.get('/createuserstable', (req, res) => {
    let sql = 'CREATE TABLE users(id int(11) NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL, password varchar(255) NOT NULL, created_at datetime NOT NULL, updated_at datetime NOT NULL, PRIMARY KEY (id))';
    connection.query(sql, (err, result, fields) => {
        if(err) throw err;
        console.log(result);
        res.send('Users table created...');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});

