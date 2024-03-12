import { Router } from "express";
import { container } from "tsyringe";
import { AddressController } from "../controller/address.controller";
import { Validates } from "../middleware/validates.middlewares";
import { countrySchema, stateSchema } from "../schemas/address.schema";

export const addressRoutes = Router()

const controller = container.resolve(AddressController)
const validate = container.resolve(Validates)

addressRoutes.post("/country/create",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    validate.validateBody({ body: countrySchema }),
    (req, res) => controller.createCountry(req, res)
);

addressRoutes.patch("/country/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    validate.validateBody({ body: countrySchema }),
    (req, res) => controller.updateCountry(req, res)
);

addressRoutes.get("/country/",
    (req, res) => controller.getCountry(req, res)
);

addressRoutes.delete("/country/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res) => controller.deleteCountry(req, res)
);

addressRoutes.post("/cities/create",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    validate.validateBody({ body: stateSchema }),
    (req, res) => controller.createCity(req, res)
);

addressRoutes.patch("/cities/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    validate.validateBody({ body: stateSchema }),
    (req, res) => controller.updateCity(req, res)
);

addressRoutes.delete("/cities/:id",
    (req, res, next) => validate.validateToken(req, res, next),
    (req, res, next) => validate.validateAdminRole(req, res, next),
    (req, res) => controller.deleteCity(req, res)
);

addressRoutes.get("/cities",
    (req, res) => controller.getCities(req, res)
);