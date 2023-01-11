import express from "express";
import multer from "multer";
import { getPlanners, saveFile, writePlanners } from "../../library/fs-tools.js";

const filesRouter = express.Router();

filesRouter.post("/file", multer().single("file"), async (req, res, next) => {
  try {
    const fileName = req.file.originalname;
    await saveFile(fileName, req.file.buffer);
    const url = `localhost:5000/images/${fileName}`;

    const planners = await getPlanners();
    const planINdex = planners.findIndex((planner) => planner.id === req.params.id);
    if (planINdex !== -1) {
      const newPlanner = { ...planners[planINdex], file: url, updated: new Date() };
      planners[planINdex] = newPlanner;

      await writePlanners();
    }

    res.send({ Message: "File Added" });
  } catch (error) {
    next(error);
  }
});

export default filesRouter;
