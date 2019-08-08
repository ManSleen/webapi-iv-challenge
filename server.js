const express = require("express");
const cors = require("cors");

const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use(cors());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

module.exports = server;
