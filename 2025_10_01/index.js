const http = require('http');
const url = require('url');
const fs = require('fs');

const PORT = 8080;

const server = http.createServer((req, res) => {
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
    default:
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found\n');
      break;
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});