import express from "express";

const server = express();
const port = 3000;

server.use(express.json());

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
