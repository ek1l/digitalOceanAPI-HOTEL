import { inject, injectable } from "tsyringe";
import { SportService } from "../services/sports.services";
import { Request, Response } from "express";

@injectable()
export class SportController {
    constructor(@inject("SportServices") private SportServices: SportService) { }

    async create(req: Request, res: Response) {
        const create = await this.SportServices.create(req)
        return res.status(201).json(create)
    }

    async update(req: Request, res: Response) {
        const update = await this.SportServices.update(req)
        return res.status(200).json(update)
    }

    async delete(req: Request, res: Response) {
        await this.SportServices.delete(req)
        return res.status(204).send()
    }

    async get (req: Request, res: Response) {
        const get = await this.SportServices.get(req)
        return res.status(201).json(get)
    }
}