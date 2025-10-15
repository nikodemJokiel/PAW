const http = require('http');
const url = require('url');
const fs = require('fs');
const {readFile} = require('fs/promises')
const mime = require("mime-types");

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);

  console.log(`${req.method} ${req.url}`);

  const path = parsed.pathname;

  switch (path) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Strona główna\n');
      break;
    case '/json':
      const exampleJSON = {'studets':[ 
                            { name: 'Nikodem', age: 18, school: 'ZSK' },
                            { name: 'Bartosz', age: 17, school: 'ZSK' }
                          ]};
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(exampleJSON));
      break;
    case '/html':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8">
    <title>Example HTML</title>
  </head>
  <body>
    <h1>Example HTML</h1>
    <p>Generated inside node.js</p>
  </body>
</html>`);
      break;
    case '/external-html':
      fs.readFile('index.html', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Error loading file\n');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data);
        }
      });
      break;
      case '/get_params':
        const queryParams = parsed.query;
        const paramsStr = JSON.stringify(queryParams, null, 2 );
        console.log(paramsStr);
        fs.writeFile(`params_${Date.now()}.json`, paramsStr, err => {
          if (err) {
              console.error(err);
          }else {
              console.log(`Successfully retrieved ${Date.now()}.json`);
          }
        })
        const message = {ok: 'ok'}
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(message));
        break;

      default:
        try {
          const filePath = `./assets${parsed.pathname}`;
          const fileType = mime.lookup(filePath);
          const fileContent = await readFile(filePath);
          res.writeHead(200, { 'Content-Type': fileType });
          res.end(fileContent);
        } catch (err) {
            console.error(err.message);
            res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'File not found' }));
        }

        break;
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});