import express from "express";
import uniqid from "uniqid";
import { getPlanners, writePlanners } from "../../library/fs-tools.js";

const plannerRouter = express.Router();

plannerRouter.post("/", async (req, res, next) => {
  try {
    const newPlanner = { ...req.body, id: uniqid(), createdAt: new Date(), updatedAt: new Date() };
    const Planners = await getPlanners();
    console.log(newPlanner);
    console.log(Planners);
    Planners.push(newPlanner);
    writePlanners(Planners);
    res.status(201).send(newPlanner);
  } catch (error) {
    next(error);
  }
});

plannerRouter.get("/", async (req, res, next) => {
  try {
    const Planners = await getPlanners();
    res.status(200).send(Planners);
  } catch (error) {
    next(error);
  }
});

export default plannerRouter;
