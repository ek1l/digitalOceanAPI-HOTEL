import { inject, injectable } from "tsyringe";
import { AddressServices } from "../services/address.services";
import { Request, Response } from "express";

@injectable()
export class AddressController {
    constructor(@inject("AddressServices") private AddressServices: AddressServices) {}

    async createCountry(req: Request, res: Response) {
        const create = await this.AddressServices.createCountry(req.body)
        return res.status(201).json(create)
    }

    async updateCountry (req: Request, res: Response){
        const updated = await this.AddressServices.updateCountry(req.body, Number(req.params.id))
        return res.status(200).json(updated)
    }

    async getCountry (req: Request, res: Response){
        const get = await this.AddressServices.getCountry()
        return res.status(200).json(get)
    }

    async deleteCountry (req: Request, res: Response){
        await this.AddressServices.deleteCountry(Number(req.params.id))
        return res.status(204).send()
    }

    async createCity (req: Request, res: Response){
        const created = await this.AddressServices.createCity(req.body)
        return res.status(201).json(created)
    }

    async updateCity(req: Request, res: Response) {
        const updated = await this.AddressServices.updateCity(req.body, Number(req.params.id))
        return res.status(200).json(updated)
    }

    async deleteCity(req: Request, res: Response) {
        await this.AddressServices.deleteCity(Number(req.params.id))
        return res.status(204).send()
    }

    async getCities (req: Request, res: Response) {
        const cities = await this.AddressServices.getCities()
        return res.status(200).json(cities)
    }
}