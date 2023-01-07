import express from "express";
import plannerRouter from "./api/planner/planner.js";
import taskRouter from "./api/task/task.js";
import listEndpoints from "list-endpoints-express";
import { badRequest, unauthorizedHandler, notFoundHandler, genericHandler } from "./errorsHandler.js";
import cors from "cors";

const server = express();
const port = 3000;

server.use(express.json());

server.use(cors());

server.use("/planner", plannerRouter);
server.use("/task", taskRouter);

server.use(badRequest);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericHandler);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.table(listEndpoints(server));
});
