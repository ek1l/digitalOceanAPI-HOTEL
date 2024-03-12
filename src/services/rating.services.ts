import { injectable } from "tsyringe";
import { prisma } from "../database";
import { AppError } from "../errors/appError.erros";

@injectable()
export class RatingServices {
    async create(data: any) {
        const find = await prisma.ratings.findFirst({
            where: {
                rating: {
                    equals: data.rating.toLowerCase()
                }
            }
        })
        if (find) throw new AppError(409, "Rating alread create")
        const create = await prisma.ratings.create({
            data: {
                rating: data.rating
            }
        })
        return create
    }

    async update(data: any, id: number) {
        const find = await prisma.ratings.findFirst({
            where: { id: id }
        })
        if (!find) throw new AppError(404, "Rating not found.")
        const updated = await prisma.ratings.update({
            where: { id: id },
            data: {
                rating: data.rating
            }
        })
        return updated
    }

    async get() {
        const get = await prisma.ratings.findMany()
        return get
    }

    async delete(id: number) {
        const find = await prisma.ratings.findFirst({
            where: { id: id }
        })
        if (!find) throw new AppError(404, "Rating not found")
        await prisma.ratings.delete({
            where: { id: id }
        })
    }
}