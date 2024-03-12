import { inject, injectable } from "tsyringe";
import { NewsServices } from "../services/news.services";
import { Request, Response } from "express";
import { UploadedFiles } from "../config/multer.config";

@injectable()
export class NewsController {
    constructor(@inject("NewsServices") private NewsServices: NewsServices) { }

    async create(req: Request, res: Response) {
        const create = await this.NewsServices.create(req.body, req.files as UploadedFiles)
        return res.status(201).json(create)
    }

    async upload(req: Request, res: Response) {
        const update = await this.NewsServices.upload(req.body, req.files as UploadedFiles, Number(req.params.id))
        return res.status(200).json(update)
    }

    async delete(req: Request, res: Response) {
        await this.NewsServices.delete(Number(req.params.id))
        return res.status(204).send()
    }

    async get(req: Request, res: Response) {
        const id = req.params.id
        const get = await this.NewsServices.get(Number(id))
        return res.status(200).json(get)
    }
}