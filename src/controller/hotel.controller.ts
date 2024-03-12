import { inject, injectable } from "tsyringe";
import { HotelServices } from "../services/hotel.services";
import { Request, Response } from "express";


@injectable()
export class HotelController {
    constructor(@inject("HotelServices") private HotelServices: HotelServices) { }

    async create(req: Request, res: Response) {
        const createdHotel = await this.HotelServices.create(req)
        return res.status(200).json(createdHotel)
    }

    async getAll(req: Request, res: Response) {
        const id = req.params.id ? Number(req.params.id) : undefined;
        const hotels = await this.HotelServices.get(id, req.query);
        res.status(200).json(hotels);
    }

    async update(req: Request, res: Response) {
        const updated = await this.HotelServices.update(Number(req.params.id), req)
        return res.status(200).json(updated)
    }

    async delete(req: Request, res: Response) {
        await this.HotelServices.delete(req, Number(req.params.id))
        return res.status(200).send()
    }

    async deleteImageHotel(req: Request, res: Response) {
        await this.HotelServices.deleteImageHotel(Number(req.params.id))
        return res.status(200).send()
    }

}