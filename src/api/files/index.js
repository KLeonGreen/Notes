import express from "express";
import multer from "multer";
import { getPlanners, readJSONfileStream, saveFile, writePlanners } from "../../library/fs-tools.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { createGzip } from "zlib";
import { pipeline } from "stream";
import fs from "fs-extra";
import { getPDFReadableStream } from "../../library/pdf-tools.js";

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
    const test = readJSONfileStream();

    console.log(req.file);
    console.log(test);

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

filesRouter.get("/JSON", async (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", "attachment; filename=planner.json.gz");
    const source = fs.createReadStream(join(process.cwd(), "./files/test.json"));
    console.log(source);
    const destination = res;
    const transform = createGzip();
    pipeline(source, transform, destination, (err) => {
      if (err) console.log(err);
    });
  } catch (error) {
    next(error);
  }
});

filesRouter.get("/pdf", async (req, res, next) => {
  res.setHeader("Content-Disposition", "attachment; filename=planner.pdf");
  const planners = await getPlanners();
  const source = getPDFReadableStream(planners);
  const destination = res;
  pipeline(source, destination, (err) => {
    if (err) console.log(err);
  });
});

export default filesRouter;
