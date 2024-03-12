import { Router } from "express";
import { container } from "tsyringe";
import { Validates } from "../middleware/validates.middlewares";
import { TravelTimeController } from "../controller/travelTime.controller";
import { travelTimeCreateSchema } from "../schemas/travelTime.schema";

export const travelTimeRoutes = Router()

const validate = container.resolve(Validates)
const controller = container.resolve(TravelTimeController)

travelTimeRoutes.post("/create",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    validate.validateBody({ body: travelTimeCreateSchema }),
    (req, res) => controller.create(req, res)
)

travelTimeRoutes.patch("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    validate.validateBody({ body: travelTimeCreateSchema }),
    (req, res) => controller.update(req, res)
)

travelTimeRoutes.delete("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res) => controller.delete(req, res)
)

travelTimeRoutes.get("/",
    (req, res) => controller.get(req, res)
)