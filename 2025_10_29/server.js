const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

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
    console.log(req.body);
    res.redirect('/');
})
app.get('*', (req, res) => {
    res.status(404).send("File Not Found");
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})