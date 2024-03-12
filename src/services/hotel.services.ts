import { injectable } from 'tsyringe';
import { prisma } from '../database';
import fs from 'fs';
import { UploadedFiles } from '../config/multer.config';
import { Request } from 'express';
import { AppError } from '../errors/appError.erros';
import { ICreateHotel } from '../interface/hotel.interface';

@injectable()
export class HotelServices {
  async create(req: Request) {
    const photos = req.files as UploadedFiles;
    if (!photos) {
      throw new AppError(404, 'Photos are required.');
    }

    const data: ICreateHotel = req.body;

    const parsedData: ICreateHotel = {
      ...data,
      facilitiesIds: JSON.parse(data.facilitiesIds as string),
      conditionIds: JSON.parse(data.conditionIds as string),
      travelTimeIds: JSON.parse(data.travelTimeIds as string),
      sportsIds: JSON.parse(data.sportsIds as string),
      description: JSON.parse(data.description as string),
      comment: JSON.parse(data.comment as string),
    };

    const cityId = Number(parsedData.cityId);
    const ratingId = Number(parsedData.ratingId);

    const [findCity, conditions, travelTimes, facilities, sport] =
      await Promise.all([
        prisma.cities.findUnique({ where: { id: cityId } }),
        prisma.conditions.findMany({
          where: { id: { in: parsedData.conditionIds } },
        }),
        prisma.travelTime.findMany({
          where: { id: { in: parsedData.travelTimeIds } },
        }),
        prisma.facilities.findMany({
          where: { id: { in: parsedData.facilitiesIds } },
        }),
        prisma.sports.findMany({ where: { id: { in: parsedData.sportsIds } } }),
      ]);

    if (!findCity) {
      throw new AppError(404, 'City not found');
    }

    const photosHotel = photos.hotel.map((photo) => ({ path: photo.path }));

    const created = await prisma.hotel.create({
      data: {
        name: parsedData.name,
        description: {
          create: {
            accommodation: parsedData.description.accommodation,
            activities: parsedData.description.activities,
            comment: {
              create: {
                author: parsedData.comment.author,
                comment: parsedData.comment.comment,
                photo: photos.authors[0].path,
              },
            },
            destination: parsedData.description.destination,
          },
        },
        rating: { connect: { id: ratingId } },
        images: { createMany: { data: photosHotel } },
        city: { connect: { id: cityId } },
        facilities: {
          connect: facilities.map((facility) => ({ id: facility.id })),
        },
        condition: {
          connect: conditions.map((condition) => ({ id: condition.id })),
        },
        travelTime: {
          connect: travelTimes.map((travelTime) => ({ id: travelTime.id })),
        },
        sport: { connect: sport.map((sport) => ({ id: sport.id })) },
      },
      include: this.includeRelations()
    });

    return created;
  }

  async get(id?: number, filters?: any) {
    let hotels;

    try {
      if (id) {
        const hotel = await prisma.hotel.findFirst({
          where: { id: id },
          include: this.includeRelations(),
        });

        if (!hotel) {
          throw new AppError(404, 'Hotel not found.');
        }

        hotels = [hotel];
      } else {
        const whereClause = this.buildWhereClause(filters);
        hotels = await prisma.hotel.findMany({
          where: whereClause,

          include: this.includeRelations()

        });
        console.log("teste")
      }

      return hotels;
    } catch (error) {
      throw new AppError(500, 'Internal Server Error');
    }
  }

  includeRelations() {
    return {
      city: { include: { country: true } },
      condition: true,
      sport: true,
      facilities: true,
      images: true,
      travelTime: true,
      rating: true,
      description: { include: { comment: true } }
    };
  }

  buildWhereClause(filters: any) {
    const where: any = {};

    if (filters) {
      if (filters.name) {
        where['name'] = {
          contains: filters.name.toLowerCase(),
          mode: 'insensitive',
        };
      }
      if (filters.rating) {
        where['ratingId'] = {
          in: filters.rating.split(',').map((id: string) => parseInt(id)),
        };
      }
      if (filters.city) {
        where['cityId'] = {
          in: filters.city.split(',').map((id: string) => parseInt(id)),
        };
      }
      if (filters.condition) {
        where['condition'] = {
          some: {
            id: {
              in: filters.condition
                .split(',')
                .map((id: string) => parseInt(id)),
            },
          },
        };
      }
      if (filters.travelTime) {
        where['travelTime'] = {
          some: {
            id: {
              in: filters.travelTime
                .split(',')
                .map((id: string) => parseInt(id)),
            },
          },
        };
      }
      if (filters.sport) {
        where['sport'] = {
          some: {
            id: {
              in: filters.sport.split(',').map((id: string) => parseInt(id)),
            },
          },
        };
      }
      if (filters.country) {
        where['city'] = {
          countryId: {
            in: filters.country.split(',').map((id: string) => parseInt(id)),
          },
        };
      }
      if (filters.facilities) {
        where['facilities'] = {
          some: {
            id: {
              in: filters.facilities
                .split(',')
                .map((id: string) => parseInt(id)),
            },
          },
        };
      }
    }
    return where;
  }

  async update(id: number, req: Request) {
    const photos = req.files as UploadedFiles | undefined;
    const data: ICreateHotel = req.body;
    data.facilitiesIds = JSON.parse(data.facilitiesIds as string);
    data.conditionIds = JSON.parse(data.conditionIds as string);
    data.travelTimeIds = JSON.parse(data.travelTimeIds as string);
    data.sportsIds = JSON.parse(data.sportsIds as string);
    data.description = JSON.parse(data.description as string);
    data.comment = JSON.parse(data.comment as string);

    const findHotel = await prisma.hotel.findUnique({
      where: { id },
      include: {
        images: true,
        description: { include: { comment: true } },
      },
    });

    if (!findHotel) {
      throw new AppError(404, 'Hotel not found');
    }

    const findCity = await prisma.cities.findUnique({
      where: { id: Number(data.cityId) },
    });

    if (!findCity) {
      throw new AppError(404, 'City not found');
    }

    const conditions = await prisma.conditions.findMany({
      where: {
        id: {
          in: data.conditionIds,
        },
      },
    });
    const travelTimes = await prisma.travelTime.findMany({
      where: {
        id: {
          in: data.travelTimeIds,
        },
      },
    });

    console.log(photos?.authors);

    photos?.authors ? fs.unlinkSync(findHotel.description.comment.photo) : null

    const facilities = await prisma.facilities.findMany({
      where: { id: { in: data.facilitiesIds } },
    });

    const sports = await prisma.sports.findMany({
      where: { id: { in: data.sportsIds } },
    });

    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data: {
        name: data.name,
        description: {
          update: {
            accommodation: data.description.accommodation,
            activities: data.description.activities,
            comment: {
              update: {
                author: data.comment.author,
                photo:
                  photos?.authors ? photos?.authors[0].path : findHotel.description.comment?.photo,
                comment: data.comment.comment,
              },
            },
            destination: data.description.destination,
          },
        },
        rating: { connect: { id: Number(data.ratingId) } },
        city: { connect: { id: Number(data.cityId) } },
        condition: {
          set: conditions.map((condition) => ({ id: condition.id })),
        },
        travelTime: {
          set: travelTimes.map((travelTime) => ({ id: travelTime.id })),
        },
        facilities: {
          set: facilities.map((facility) => ({ id: facility.id })),
        },
        sport: { set: sports.map((sport) => ({ id: sport.id })) },
      },
      include: this.includeRelations()
    });

    console.log(photos?.hotel)
    if (photos?.hotel) {

      const photosPath = photos?.hotel.map((photo) => photo.path);
      await prisma.images.createMany({
        data: photosPath!.map((path) => ({ path, hotelId: id })),
      });
    }

    return updatedHotel;
  }

  async delete(req: Request, id: number) {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: {
        images: true,
        description: { include: { comment: true } },
      },
    });

    if (!hotel) {
      throw new AppError(404, 'Hotel not found');
    }

    hotel.images.forEach((image) => {
      fs.unlinkSync(image.path);
    });
    fs.unlinkSync(hotel.description.comment.photo);

    const deletedHotel = await prisma.hotel.delete({
      where: { id },
      include: { images: true },
    });
    return deletedHotel;
  }

  async deleteImageHotel(id: number) {
    const find = await prisma.images.findFirst({ where: { id: id } })

    if (!find) throw new AppError(404, "Image not found")

    fs.unlinkSync(find.path)

    await prisma.images.delete({
      where: { id: id }
    })
  }
}
