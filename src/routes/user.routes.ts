import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "../controller/user.controller";
import { Validates } from "../middleware/validates.middlewares";
import { loginSchema, userRegisterSchema, userUpdateSchema } from "../schemas/user.schema";


export const userRoutes = Router()

const controller = container.resolve(UserController)
const validate = container.resolve(Validates)

userRoutes.post("/register",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    validate.validateBody({ body: userRegisterSchema }),
    (req, res) => controller.create(req, res)
);

userRoutes.post("/login",
    validate.validateBody({ body: loginSchema }),
    (req, res) => controller.login(req, res)
);

userRoutes.get("/",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res) => controller.get(req, res));

userRoutes.delete("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res) => controller.delete(req, res)
);

userRoutes.patch("/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    validate.validateBody({ body: userUpdateSchema }),
    (req, res) => controller.update(req, res)
);

userRoutes.post("/verifytoken",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res) => controller.validateToken(req, res)
);