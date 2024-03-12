import { Router } from "express";
import { container } from "tsyringe";
import { NewsController } from "../controller/news.controller";
import { upload } from "../config/multer.config";
import { Validates } from "../middleware/validates.middlewares";

export const newsRouter = Router()

const controller = container.resolve(NewsController)
const valite = container.resolve(Validates)

newsRouter.post("/create",
    (req, res, next) => valite.validateToken(req, res, next),
    (req, res, next) => valite.validateAdminRole(req, res, next),
    upload.fields([{ name: "banner", maxCount: 1 }]),
    (req, res) => controller.create(req, res)
)

newsRouter.patch("/:id",
    (req, res, next) => valite.validateToken(req, res, next),
    (req, res, next) => valite.validateAdminRole(req, res, next),
    upload.fields([{ name: "banner", maxCount: 1 }]),
    (req, res) => controller.upload(req, res)
)

newsRouter.delete("/:id",
    (req, res, next) => valite.validateToken(req, res, next),
    (req, res, next) => valite.validateAdminRole(req, res, next),
    (req, res) => controller.delete(req, res)
)

newsRouter.get("/:id?",
    (req, res) => controller.get(req, res)
)