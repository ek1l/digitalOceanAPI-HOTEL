import { Router } from "express";
import { container } from "tsyringe";
import { Validates } from "../middleware/validates.middlewares";
import { SportController } from "../controller/sport.controller";
import { sportCreateSchema } from "../schemas/sport.schema";

export const sportRoutes = Router()

const validate = container.resolve(Validates)
const controller = container.resolve(SportController)

sportRoutes.post("/create",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    validate.validateBody({body: sportCreateSchema}),
    (req, res) => controller.create(req, res)
)

sportRoutes.patch("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    validate.validateBody({body: sportCreateSchema}),
    (req, res) => controller.update(req, res)
)

sportRoutes.delete("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res) => controller.delete(req, res)
)

sportRoutes.get("/",
    (req, res) => controller.get(req, res)
)