import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const plannerSchema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "name not specified",
    },
  },
};

const taskSchema = {
  content: {
    in: ["body"],
    isString: {
      errorMessage: "content not specified",
    },
  },
  done: {
    in: ["body"],
    isBoolean: {
      errorMessage: "done not specified",
    },
  },
  // plannerId: {
  //   in: ["body"],
  //   isString: {
  //     errorMessage: "plannerId not specified",
  //   },
  // },
};

export const checkPlannerSchema = checkSchema(plannerSchema);
export const checkTasksSchema = checkSchema(taskSchema);

export const detectBadRequest = (req, res, next) => {
  const possibleErrors = validationResult(req);
  const possibleErrorsArray = possibleErrors.array();

  if (possibleErrors.isEmpty()) {
    next();
  } else {
    next(createHttpError(400, "Something went wrong", { errors: possibleErrorsArray }));
  }
};
