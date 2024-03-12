import { inject, injectable } from "tsyringe";
import { ConditionServices } from "../services/condition.services";
import { Request, Response } from "express";

@injectable()
export class ConditionController {
    constructor(@inject("ConditionServices") private ConditionServices: ConditionServices) { }

    async create(req: Request, res: Response) {
        const create = await this.ConditionServices.create(req)
        return res.status(201).json(create)
    }

    async update(req: Request, res: Response) {
        const update = await this.ConditionServices.update(req)
        return res.status(200).json(update)
    }

    async delete(req: Request, res: Response) {
        await this.ConditionServices.delete(req)
        return res.status(204).send()
    }

    async get (req: Request, res: Response) {
        const get = await this.ConditionServices.get(req)
        return res.status(201).json(get)
    }
}