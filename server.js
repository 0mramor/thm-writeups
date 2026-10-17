const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('device1.key'),
  cert: fs.readFileSync('device1.crt')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello over HTTPS with my own cert!\n');
}).listen(8443, () => {
  console.log('Server running at https://localhost:8443');
});