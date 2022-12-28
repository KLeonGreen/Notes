import fs from "fs-extra";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { writeFile, readJSON, writeJSON } = fs;

const dataPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const plannerPath = join(dataPath, "planner.json");

console.log(plannerPath);

export const getPlanners = () => {
  return readJSON(plannerPath);
};

export const writePlanners = (planners) => {
  return writeJSON(plannerPath, planners);
};
