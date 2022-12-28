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

plannerRouter.get("/:id", async (req, res, next) => {
  try {
    const Planners = await getPlanners();
    const id = req.params.id;
    const foundPlanner = Planners.find((planner) => planner.id === id);
    res.status(200).send(foundPlanner);
  } catch (error) {
    next(error);
  }
});

plannerRouter.put("/:id", async (req, res, next) => {
  try {
    const Planners = await getPlanners();
    const id = req.params.id;
    const initialPlannerIndex = Planners.findIndex((planner) => planner.id === id);
    const initialPlanner = Planners[initialPlannerIndex];
    const updatedPlanner = { ...initialPlanner, ...req.body, updatedAt: new Date() };
    Planners[initialPlannerIndex] = updatedPlanner;
    writePlanners(Planners);
    res.status(200).send(updatedPlanner);
  } catch (error) {
    next(error);
  }
});

plannerRouter.delete("/:id", async (req, res, next) => {
  try {
    const Planners = await getPlanners();
    const id = req.params.id;
    const remainingPlanners = Planners.filter((planners) => planners.id !== id);
    writePlanners(remainingPlanners);
    res.status(200).send(remainingPlanners);
  } catch (error) {
    next(error);
  }
});

export default plannerRouter;
