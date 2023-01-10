import express from "express";
import plannerRouter from "./api/planner/planner.js";
import taskRouter from "./api/task/task.js";
import listEndpoints from "list-endpoints-express";
import { badRequest, unauthorizedHandler, notFoundHandler, genericHandler } from "./errorsHandler.js";
import cors from "cors";
import createHttpError from "http-errors";

const server = express();
const port = process.env.PORT;

server.use(express.json());

const allowedorigins = [process.env.FE_DEV_URL];

// server.use(
//   cors({
//     origin: (origin, corsNext) => {
//       console.log("CORS Origin: ", origin);
//       if (allowedorigins.indexOf(origin) !== -1) {
//         corsNext(null, true);
//       } else {
//         corsNext(createHttpError(400, `origin ${origin} not allowed`));
//       }
//     },
//   })
// );
server.use(cors());

server.use("/planner", plannerRouter);
server.use("/task", taskRouter);

server.use(badRequest);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericHandler);

server.listen(port, () => {
  console.log("Server is running on port:", port);
  console.table(listEndpoints(server));
});
