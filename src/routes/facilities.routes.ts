import { Router } from "express";
import { container } from "tsyringe";
import { FacilitiesController } from "../controller/facilities.controller";
import { uploadIcons } from "../config/multer.config";
import { Validates } from "../middleware/validates.middlewares";

export const facilitiesRoutes = Router()

const controller = container.resolve(FacilitiesController)
const validate = container.resolve(Validates)

facilitiesRoutes.post("/create",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    uploadIcons.single("icon"),
    (req, res) => controller.create(req, res)
);

facilitiesRoutes.get("/",
    (req, res) => controller.get(req, res)
);

facilitiesRoutes.delete("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res) => controller.delete(req, res)
);

facilitiesRoutes.patch("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    uploadIcons.single("icon"),
    (req, res) => controller.update(req, res)
);