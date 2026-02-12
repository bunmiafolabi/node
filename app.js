import http from "http";
import fs from "fs";
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html>');
    res.write('<head><title>My Node.js Server</title></head>');
    res.write('<body>');
    res.write('<h1>Welcome to my Node.js server!</h1>');
    res.write('<form action="/message" method="POST"><input type="text" name="message" /><input type="submit" value="Submit" /></form>')
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (req.url === '/message' && req.method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    })
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = decodeURIComponent(
        parsedBody.split('=')[1].replace(/\+/g, ' ')
      );
      fs.writeFileSync('message.txt', message);
      res.statusCode = 302;
      res.setHeader('Location', '/message'); 
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<p>Message received: <strong>${message}</strong></p>`);
      res.write('<a href="/">Go back to home</a>');
      return res.end();
    })
  }
});

server.listen(port, () => {
  console.log(`port running on port ${port}`);
})
