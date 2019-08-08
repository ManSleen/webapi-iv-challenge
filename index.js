// code away!
const server = require("./server");

const port = 8050;

server.listen(port, () => {
  console.log(`API is up and running on port ${port}`);
});
