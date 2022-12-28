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

export const checkPlannerSchema = checkSchema(plannerSchema);

export const detectBadRequest = (req, res, next) => {
  const possibleErrors = validationResult(req);
  const possibleErrorsArray = possibleErrors.array();

  if (possibleErrors.isEmpty()) {
    next();
  } else {
    next(createHttpError(400, "Something went wrong", { errors: possibleErrorsArray }));
  }
};
