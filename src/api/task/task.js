import express from "express";
import uniqid from "uniqid";
import { writePlanners, getPlanners, getTasks, writeTasks } from "../../library/fs-tools.js";
import { checkTasksSchema, detectBadRequest } from "../planner/validator.js";

const taskRouter = express.Router();

taskRouter.post("/:id", checkTasksSchema, detectBadRequest, async (req, res, next) => {
  try {
    const planners = await getPlanners();
    const currentPlannerIndex = planners.findIndex((plan) => plan.id === req.params.id);
    const currentPlanner = planners[currentPlannerIndex];

    const task = { ...req.body, id: uniqid(), plannerId: currentPlanner.id, createdAt: new Date() };

    const tasks = await getTasks();
    tasks.push(task);

    await writeTasks(tasks);

    res.status(200).send(task);
  } catch (error) {
    next(error);
  }
});

taskRouter.get("/", async (req, res, next) => {
  try {
    const tasks = await getTasks();
    const undoneTask = tasks.filter((task) => task.done === false);
    res.status(200).send(undoneTask);
  } catch (error) {
    next(error);
  }
});

taskRouter.get("/:id", async (req, res, next) => {
  try {
    const tasks = await getTasks();
    const id = req.params.id;
    const selectedTask = tasks.find((task) => task.id === id);
    res.status(200).send(selectedTask);
  } catch (error) {
    next(error);
  }
});

taskRouter.put("/:id", async (req, res, next) => {
  try {
    const tasks = await getTasks();
    const id = req.params.id;
    const oldTaskIndex = tasks.findIndex((task) => task.id === id);
    const oldTask = tasks[oldTaskIndex];
    const newTask = { ...oldTask, ...req.body, updatedAt: new Date() };
    tasks[oldTaskIndex] = newTask;
    await writeTasks(tasks);
    res.status(200).send(newTask);
  } catch (error) {
    next(error);
  }
});

taskRouter.delete("/:id", async (req, res, next) => {
  try {
    const tasks = await getTasks();
    const id = req.params.id;
    const remainingTasks = tasks.filter((task) => task.id !== id);
    await writeTasks(remainingTasks);
    res.status(200).send(remainingTasks);
  } catch (error) {
    next(error);
  }
});

export default taskRouter;
