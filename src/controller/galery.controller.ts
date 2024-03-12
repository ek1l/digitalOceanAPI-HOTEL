import { inject, injectable } from "tsyringe";
import { GaleryServices } from "../services/galery.services";
import { Request, Response } from "express";
import { UploadedFiles } from "../config/multer.config";

@injectable()
export class GaleryController {
    constructor(@inject("GaleryServices") private GaleryServices : GaleryServices) {}
    
    async create(req:Request, res: Response) {
        const create = await this.GaleryServices.create(req.files as UploadedFiles)
        return res.status(201).json(create)
    }

    async delete(req: Request, res: Response) {
        await this.GaleryServices.delete(Number(req.params.id))
        return res.status(204).send()
    }

    async get (req: Request, res: Response) {
        const get = await this.GaleryServices.get()
        return res.status(200).json(get)
    }
}