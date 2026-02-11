const http = require('http');
const port = 4000;

const server = http.createServer((req, res) => {
  console.log(req)
});

server.listen(port, () => {
  console.log(`port running on port ${port}`)
})
