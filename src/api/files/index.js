import express from "express";
import multer from "multer";
import { getPlanners, saveFile, writePlanners } from "../../library/fs-tools.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const filesRouter = express.Router();

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: { folder: "planners/files" },
  }),
}).single("file");

filesRouter.post("/:id/file", cloudinaryUploader, async (req, res, next) => {
  try {
    // const fileName = req.file.originalname;
    // await saveFile(fileName, req.file.buffer);
    // const url = `localhost:5000/images/${fileName}`;

    console.log(req.file);

    const url = req.file.path;

    const planners = await getPlanners();
    const planINdex = planners.findIndex((planner) => planner.id === req.params.id);
    if (planINdex !== -1) {
      const newPlanner = { ...planners[planINdex], file: url, updated: new Date() };
      planners[planINdex] = newPlanner;

      await writePlanners(planners);
    }

    res.send({ Message: "File Added" });
  } catch (error) {
    next(error);
  }
});

export default filesRouter;
