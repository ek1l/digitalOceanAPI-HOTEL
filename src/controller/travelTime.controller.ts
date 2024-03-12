import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { TravelTimeServices } from "../services/travelTime.services";

@injectable()
export class TravelTimeController {
    constructor(@inject("TravelTimeServices") private TravelTimeServices: TravelTimeServices) { }

    async create(req: Request, res: Response) {
        const create = await this.TravelTimeServices.create(req)
        return res.status(201).json(create)
    }

    async update(req: Request, res: Response) {
        const update = await this.TravelTimeServices.update(req)
        return res.status(200).json(update)
    }

    async delete(req: Request, res: Response) {
        await this.TravelTimeServices.delete(req)
        return res.status(204).send()
    }

    async get (req: Request, res: Response) {
        const get = await this.TravelTimeServices.get(req)
        return res.status(201).json(get)
    }
}