import { Router } from "express";
import { container } from "tsyringe";
import { Validates } from "../middleware/validates.middlewares";
import { ConditionController } from "../controller/condition.controller";
import { conditionCreateSchema } from "../schemas/condition.schema";

export const conditionsRoutes = Router()

const validate = container.resolve(Validates)
const controller = container.resolve(ConditionController)

conditionsRoutes.post("/create",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    validate.validateBody({body: conditionCreateSchema}),
    (req, res) => controller.create(req, res)
)

conditionsRoutes.patch("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    validate.validateBody({body: conditionCreateSchema}),
    (req, res) => controller.update(req, res)
)

conditionsRoutes.delete("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res) => controller.delete(req, res)
)

conditionsRoutes.get("/",
    (req, res) => controller.get(req, res)
)