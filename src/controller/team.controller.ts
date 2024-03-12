import { inject, injectable } from "tsyringe";
import { TeamServices } from "../services/team.services";
import { Request, Response } from "express";
import { UploadedFiles } from "../config/multer.config";

@injectable()
export class TeamController {
    constructor(@inject("TeamServices") private TeamServices: TeamServices) {}

    async create (req: Request, res: Response) {
        const create = await this.TeamServices.create(req.body, req.files as UploadedFiles)
        return res.status(201).json(create)
    }

    async update (req: Request, res: Response) {
        const update = await this.TeamServices.update(req.body, Number(req.params.id), req.files as UploadedFiles)
        return res.status(200).json(update)
    }

    async delete (req: Request, res: Response) {
        await this.TeamServices.delete(Number(req.params.id))
        return res.status(204).send()
    }

    async get (req: Request, res: Response) {
        const get = await this.TeamServices.get()
        return res.status(200).json(get)
    }
}