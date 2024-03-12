import { injectable } from "tsyringe";
import { INews } from "../interface/news.interface";
import { UploadedFiles } from "../config/multer.config";
import { AppError } from "../errors/appError.erros";
import { prisma } from "../database";
import fs from "fs";

@injectable()
export class NewsServices {
    async create(data: INews, banner: UploadedFiles) {
        if (!banner) throw new AppError(400, "Banner is require")
        const create = await prisma.news.create({
            data: {
                ...data,
                banner: banner.banner[0].path
            }
        })
        return create
    }

    async upload(data: INews, banner: UploadedFiles, id: number) {
        const find = await prisma.news.findFirst({ where: { id: id } })
        if (!find) throw new AppError(404, "News not found")

        if (banner) fs.unlinkSync(find.banner)

        const updeted = await prisma.news.update({
            where: { id: id },
            data: {
                ...data,
                banner: banner ? banner.banner[0].path : find.banner
            }
        })
        return updeted
    }

    async delete(id: number) {
        const find = await prisma.news.findFirst({ where: { id: id } })
        if (!find) throw new AppError(404, "News not found")

        await prisma.news.delete({ where: { id: id } })
    }

    async get(id?: number) {
        const query = id ? { id : id }  : {};
        return await prisma.news.findMany({
            where: query
        });
    }
}