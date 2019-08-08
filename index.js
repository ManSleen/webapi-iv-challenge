require("dotenv").config();

const server = require("./server");

const port = process.env.PORT || 8050;

server.listen(port, () => {
  console.log(`API is up and running on port ${port}`);
});
