import { join } from "path";
import fs from "fs-extra";
import request from "request";
import { pipeline } from "stream";
import { createGzip } from "zlib";

const source = fs.createReadStream(join(process.cwd(), "./streams/data.json"));
const destination = process.stdout;
const destination2 = fs.createWriteStream(join(process.cwd(), "./streams/data2.json"));
const destination3 = fs.createWriteStream(join(process.cwd(), "./streams/data3.json.gz"));
const transform = createGzip();

pipeline(source, transform, destination3, (err) => {
  if (err) console.log(err);
  else {
    console.log("Success");
    //console.log(source);
  }
});
