import { injectable } from "tsyringe";
import fs from 'fs';
import { prisma } from "../database";
import { IFacilitiesCreate } from "../interface/facilities.interface";
import { UploadedFile } from "../config/multer.config";
import { AppError } from "../errors/appError.erros";

@injectable()
export class FacilitiesServices {
    async create(data: IFacilitiesCreate, photos: UploadedFile | undefined): Promise<IFacilitiesCreate> {
        if(!photos){
            throw new AppError(404, "Icon is require")
        }
        data.icon = photos.path
        const create = await prisma.facilities.create({
            data: {
                facility: data.facility,
                icon: data.icon
            }
        })        
        return create
    }
    
    async delete (id: number): Promise<void> {
        const find = await prisma.facilities.findFirst({where: {id: id}})
        if(!find) {
            throw new AppError(404, "Facilities not found")
        }
        const deleteFile = (filePath: string) => {
            fs.unlink(filePath, (error) => {
                if (error) {
                    console.log('Erro ao deletar arquivo.');
                }
            });
        };
        deleteFile(find.icon)
        await  prisma.facilities.delete({where: {id: id}})
    }

    async get (): Promise<IFacilitiesCreate[]> {
        const get = await prisma.facilities.findMany()
        return get
    }

    async update (data: IFacilitiesCreate, photo: UploadedFile | undefined, id: number): Promise<IFacilitiesCreate> {
        const find = await prisma.facilities.findFirst({where: {id: id}})
        if(!find) {
            throw new AppError(404, "Facilities not found")
        }
        if(!photo){
            const updated = await prisma.facilities.update({
                where: {
                    id: id
                },
                data: {
                    facility: data.facility
                }
            })
            return updated
        }
        const deleteFile = (filePath: string) => {
            fs.unlink(filePath, (error) => {
                if (error) {
                    console.log('Erro ao deletar arquivo.');
                }
            });
        };
        deleteFile(find.icon)
        const updated = await prisma.facilities.update({
            where: {
                id: id
            },
            data: {
                facility: data.facility,
                icon: {
                    set: photo.path
                }
            }
        })
        return updated
    }
}