const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2')

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'firma'
})

connection.connect()

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/main.html'));
})

app.get('/o-nas', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/about.html'));
})

app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/offer.html'));
})

app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/contact.html'));
})

app.post('/kontakt', (req, res) => {
    const body = req.body;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const message = body.message;


    connection.query(`INSERT INTO messages (id, firstName, lastName, email, message) VALUES (NULL, ?, ?, ?, ?);`, [firstName, lastName, email, message], (err)=>{
        if (err) throw err;
    });

    res.redirect('/');
})

app.get('/api/contact-messages', (req, res) => {
    connection.query('SELECT * FROM messages', (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

app.get('/api/contact-messages/:id', (req, res) => {
    const id = req.params.id;

    connection.query('SELECT * FROM messages WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        if(result.length == 0){
            res.status(404).send('Message not Found');
        }else{
            res.status(200).send(result);
        }
    });
})

app.get('*', (req, res) => {
    res.status(404).send("File Not Found");
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})
