import { Request } from "express";
import { injectable } from "tsyringe";
import { prisma } from "../database";
import { AppError } from "../errors/appError.erros";

@injectable()
export class SportService {
    async find (id: number) {
        const find = await prisma.sports.findFirst({where: {id: id}})
        if(!find){
            throw new AppError(404, "Sport not found.")
        }
    }

    async create(req: Request) {
        const sport: string  = req.body.sport
        const find = await prisma.sports.findFirst({
            where: {
                sport: sport
            }
        })
        if (find) {
            throw new AppError(409, "Sport already exists")
        }
        const create = await prisma.sports.create({
            data: {
                sport: sport
            }
        })
        return create
    }

    async update (req: Request) {
        const id = Number(req.params.id)
        await this.find(id)
        const updated = await prisma.sports.update({
            where: {id: id},
            data: {
                sport: req.body.sport
            }
        })
        return updated
    }

    async delete (req: Request) {
        const id = Number(req.params.id)
        await this.find(id)
        await prisma.sports.delete({where: {id: id}})
    }

    async get (req: Request) {
        const get = await prisma.sports.findMany()
        return get
    }

}