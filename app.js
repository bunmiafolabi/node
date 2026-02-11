import http from "http";
const port = 4000;

const server = http.createServer((req, res) => {
  console.log(req);
  res.writeHead(200, {'Content-type': "text/html"});
  res.end("<h1>Hello World!!</h1>");
});

server.listen(port, () => {
  console.log(`port running on port ${port}`);
})
