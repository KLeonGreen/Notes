import fs from "fs-extra";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { writeFile, readJSON, writeJSON } = fs;

const dataPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const plannerPath = join(dataPath, "planner.json");
const tasksPath = join(dataPath, "task.json");

console.log(plannerPath);
console.log(tasksPath);

export const getPlanners = () => {
  return readJSON(plannerPath);
};
export const getTasks = () => {
  return readJSON(tasksPath);
};

export const writePlanners = (planners) => {
  return writeJSON(plannerPath, planners);
};
export const writeTasks = (tasks) => {
  return writeJSON(tasksPath, tasks);
};
