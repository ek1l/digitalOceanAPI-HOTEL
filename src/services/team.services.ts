import { injectable } from "tsyringe";
import { ITeam } from "../interface/team.interface";
import { UploadedFiles } from "../config/multer.config";
import { AppError } from "../errors/appError.erros";
import { prisma } from "../database";
import fs from "fs"

@injectable()
export class TeamServices {
    async create(data: ITeam, photo: UploadedFiles) {
        if (!photo) throw new AppError(400, "Photo is require")
        const create = await prisma.team.create({
            data: {
                name: data.name,
                role: data.role,
                photo: photo.team[0].path
            }
        })
        return create
    }

    async update(data: ITeam, id: number, photo?: UploadedFiles) {
        const find = await prisma.team.findFirst({ where: { id: id } })
        if (!find) throw new AppError(404, "Team Member not found")

        if(photo) fs.unlinkSync(find.photo)

        const updated = await prisma.team.update({
            where: { id: id },
            data: {
                name: data.name,
                role: data.role,
                photo: photo ? photo.team[0].path : find.photo
            }
        })

        return updated
    }

    async delete (id: number) {
        const find = await prisma.team.findFirst({ where: { id: id } })
        if (!find) throw new AppError(404, "Team Member not found")

        fs.unlinkSync(find.photo)

        await prisma.team.delete({ where: { id: id }})
    }

    async get () {
        const get = await prisma.team.findMany()
        return get
    }
}