const express = require('express');
const path = require("node:path");
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, '/assets')));

app.get('/', (req, res) => {
    res.send('Strona główna\n');
})

app.get('/json', (req, res) => {
    const exampleJSON = {'studets':[
            { name: 'Nikodem', age: 18, school: 'ZSK' },
            { name: 'Bartosz', age: 17, school: 'ZSK' }
        ]};
    res.send(JSON.stringify(exampleJSON));
})

app.get('/html', (req, res) => {
    res.send(`
<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8">
    <title>Example HTML</title>
  </head>
  <body>
    <h1>Example HTML</h1>
    <p>Generated inside node.js</p>
  </body>
</html>`)
})

app.get('/externalHtml', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/get_params', (req, res) => {
    const params = req.query;
    const paramsStr = JSON.stringify(params, null, 2);
    fs.writeFile(`params_${Date.now()}.json`, paramsStr, err => {
        if (err) {
            console.error(err);
        }else {
            console.log(`Successfully retrieved ${Date.now()}.json`);
        }
    })

    const message = {ok:"ok"}
    res.send(JSON.stringify(message));
})

app.get('*', (req, res) => {
    res.send('other paths: /test.txt; /test.txt; /test,png');

})

app.listen(3000, ()=>{
    console.log('Server started on port 3000');
});