import { injectable } from "tsyringe";
import { prisma } from "../database";
import { AppError } from "../errors/appError.erros";
import { Request } from "express";

@injectable()
export class ConditionServices {

    async find (id: number) {
        const find = await prisma.conditions.findFirst({where: {id: id}})
        if(!find){
            throw new AppError(404, "Condition not found.")
        }
    }

    async create(req: Request) {
        const condition: string  = req.body.condition
        const find = await prisma.conditions.findFirst({
            where: {
                condition: condition.toLowerCase()
            }
        })
        if (find) {
            throw new AppError(409, "Condition already exists")
        }
        const create = await prisma.conditions.create({
            data: {
                condition: condition
            }
        })
        return create
    }

    async update (req: Request) {
        const id = Number(req.params.id)
        await this.find(id)
        const updated = await prisma.conditions.update({
            where: {id: id},
            data: {
                condition: req.body.condition
            }
        })
        return updated
    }

    async delete (req: Request) {
        const id = Number(req.params.id)
        await this.find(id)
        await prisma.conditions.delete({where: {id: id}})
    }

    async get (req: Request) {
        const get = await prisma.conditions.findMany()
        return get
    }
}