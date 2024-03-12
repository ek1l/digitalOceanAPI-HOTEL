import { inject, injectable } from "tsyringe";
import { FacilitiesServices } from "../services/facilities.services";
import { Request, Response } from "express";

@injectable()
export class FacilitiesController {
    constructor(@inject("FacilitiesServices") private FacilitiesServices: FacilitiesServices) { }
    async create(req: Request, res: Response) {
        const create = await this.FacilitiesServices.create(req.body, req.file)
        return res.status(201).json(create)
    }

    async delete(req: Request, res: Response) {
        await this.FacilitiesServices.delete(Number(req.params.id))
        return res.status(200).send()
    }

    async get(req: Request, res: Response) {
        const getAll = await this.FacilitiesServices.get()
        return res.status(200).json(getAll)
    }

    async update(req: Request, res: Response) {
        const updated = await this.FacilitiesServices.update(req.body, req.file, Number(req.params.id))
        return res.status(200).json(updated)
    }
}