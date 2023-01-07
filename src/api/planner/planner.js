import express from "express";
import uniqid from "uniqid";
import { getTasks, getPlanners, writePlanners } from "../../library/fs-tools.js";
import { checkPlannerSchema, detectBadRequest } from "./validator.js";

const plannerRouter = express.Router();

plannerRouter.post("/", checkPlannerSchema, detectBadRequest, async (req, res, next) => {
  try {
    const newPlanner = { ...req.body, id: uniqid(), createdAt: new Date(), updatedAt: new Date() };
    const Planners = await getPlanners();

    // const tasks = await getTasks();
    // const tasksSameId = tasks.filter((task) => task.plannerId === newPlanner.id);

    //const addedPlanner = { ...newPlanner, tasks: tasksSameId };

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
    const tasks = await getTasks();

    Planners.map((planner, index) => {
      const taskID = tasks.filter((tas) => tas.plannerId === planner.id);

      if (taskID.length) {
        const newTask = { tasks: taskID };
        const newplanner = { ...planner, tasks: taskID };
        //Planners.push(planner);
        Planners[index] = newplanner;
      }
      console.log("P ONE:", Planners);
    });

    res.status(200).send(Planners);
    console.log("P TWO:", Planners);
  } catch (error) {
    next(error);
  }
});

plannerRouter.get("/:id", async (req, res, next) => {
  try {
    const Planners = await getPlanners();
    const id = req.params.id;

    const tasks = await getTasks();
    const tasksSameId = tasks.filter((task) => task.plannerId === id);

    const foundPlanner = Planners.find((planner) => planner.id === id);
    if (tasksSameId.length) {
      const foundPlannerWithtask = { ...foundPlanner, tasks: tasksSameId };
      res.status(200).send(foundPlannerWithtask);
    } else {
      res.status(200).send(foundPlanner);
    }
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
