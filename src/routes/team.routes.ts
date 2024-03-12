import { Router } from "express";
import { container } from "tsyringe";
import { TeamController } from "../controller/team.controller";
import { upload } from "../config/multer.config";
import { Validates } from "../middleware/validates.middlewares";

export const teamRouter = Router()

const controller = container.resolve(TeamController)
const validate = container.resolve(Validates)

teamRouter.post("/create",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    upload.fields([{ name: "team", maxCount: 1 }]),
    (req, res) => controller.create(req, res)
)

teamRouter.patch("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    upload.fields([{ name: "team", maxCount: 1 }]),
    (req, res) => controller.update(req, res)
)

teamRouter.get("/",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res) => controller.get(req, res)
)

teamRouter.delete("/:id",
    (req, res) => controller.delete(req, res)
)