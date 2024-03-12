import { Request } from "express";
import { injectable } from "tsyringe";
import { prisma } from "../database";
import { AppError } from "../errors/appError.erros";

@injectable()
export class TravelTimeServices {
    async find (id: number) {
        const find = await prisma.travelTime.findFirst({where: {id: id}})
        if(!find){
            throw new AppError(404, "Condition not found.")
        }
    }

    async create (req: Request) {
        const travelTime: string = req.body.travelTime
        const find = await prisma.travelTime.findFirst({
            where: {
                travelTime: travelTime
            }
        })
        if(find){
            throw new AppError(409, "Travel Time already exists")
        }

        const create = await prisma.travelTime.create({
            data: {
                travelTime: travelTime
            }
        })
        return create
    }
    
    async update (req: Request) {
        const id = Number(req.params.id)
        await this.find(id)
        const updated = await prisma.travelTime.update({
            where: {
                id: id
            },
            data: {
                travelTime: req.body.travelTime
            }
        })
        return updated
    }

    async delete (req: Request) {
        const id = Number(req.params.id)
        await this.find(id)
        await prisma.travelTime.delete({where: {id: id}})
    }

    async get (req: Request) {
        const get = await prisma.travelTime.findMany()
        return get
    }
}