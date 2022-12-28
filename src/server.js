import express from "express";
import plannerRouter from "./api/planner/planner.js";
import listEndpoints from "list-endpoints-express";

const server = express();
const port = 3000;

server.use(express.json());

server.use("/planner", plannerRouter);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.table(listEndpoints(server));
});
