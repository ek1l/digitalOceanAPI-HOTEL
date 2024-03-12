import { Router } from "express";
import { container } from "tsyringe";
import { GaleryController } from "../controller/galery.controller";
import { upload } from "../config/multer.config";
import { Validates } from "../middleware/validates.middlewares";

export const galeryRoutes = Router()
const controller = container.resolve(GaleryController)
const validate = container.resolve(Validates)

galeryRoutes.post("/create",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    upload.fields([{ name: "galery" }]),
    (req, res) => controller.create(req, res)
)

galeryRoutes.delete("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res) => controller.delete(req, res)
)

galeryRoutes.get("/",
    (req, res) => controller.get(req, res)
)