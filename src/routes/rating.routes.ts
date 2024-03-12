import { Router } from "express";
import { container } from "tsyringe";
import { RatingController } from "../controller/rating.controller";
import { Validates } from "../middleware/validates.middlewares";

export const ratingRoutes = Router()

const controller = container.resolve(RatingController)
const validate = container.resolve(Validates)

ratingRoutes.post("/create",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res) => controller.create(req, res)
)

ratingRoutes.patch("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res) => controller.update(req, res)
)

ratingRoutes.get("/",
    (req, res) => controller.get(req, res)
)

ratingRoutes.delete("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res) => controller.delete(req, res)
)