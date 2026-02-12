import http from "http";
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  res.writeHead(200, {'Content-type': "text/html"});
  res.end("<h1>Hello World!!</h1>");
});

server.listen(port, () => {
  console.log(`port running on port ${port}`);
})
