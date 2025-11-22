const express = require('express');
const path = require('path');

const app = express();

const hostname = 'localhost';
const port = 3000

const server = app.listen(port, hostname, () => {
    console.log(`Server started on port ${port}`);
})