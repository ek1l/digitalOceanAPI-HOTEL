import { inject, injectable } from "tsyringe";
import { RatingServices } from "../services/rating.services";
import { Request, Response } from "express";

@injectable()
export class RatingController {
    constructor(@inject("RatingServices") private RatingServices : RatingServices) { }
    async create (req: Request, res:Response){
        const create = await this.RatingServices.create(req.body)
        return res.status(201).json(create)
    }

    async update(req:Request, res:Response) {
        const update = await this.RatingServices.update(req.body, Number(req.params.id))
        return res.status(200).json(update)
    }

    async get (req: Request, res:Response) {
        const get = await this.RatingServices.get()
        return res.status(200).json(get)
    }

    async delete (req: Request, res: Response) {
        await this.RatingServices.delete(Number(req.params.id))
        return res.status(204).send()
    }
}