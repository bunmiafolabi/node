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
      console.log('chunk', chunk);
      body.push(chunk);
    })
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log('parsedBody', parsedBody);
      const message = decodeURIComponent(parsedBody.split('=')[1]);
      console.log('message', message);
      fs.writeFileSync('message.txt', message);
      res.statusCode = 302;
      res.setHeader('Location', '/'); 
      return res.end();
    })
  }
});

server.listen(port, () => {
  console.log(`port running on port ${port}`);
})

/* 

port running on port 4000
chunk <Buffer 6d 65 73 73 61 67 65 3d 48 65 6c 6c 6f>
parsedBody message=Hello
message Hello
chunk <Buffer 6d 65 73 73 61 67 65 3d 48 65 6c 6c 6f>
parsedBody message=Hello
message Hello
*/