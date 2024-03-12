import { PrismaClient } from "@prisma/client";
import { UserServices } from "../services/user.services";

export const prisma = new PrismaClient()

export const main = async () => {
    const existingCondition = await prisma.conditions.findMany();
    if (existingCondition.length === 0) {
        await prisma.conditions.createMany({
            data: [
                { condition: "All inclusive" },
                { condition: "Half board" },
                { condition: "Full board" },
                { condition: "Bed and breakfast" }
            ]
        })
    }

    const existingTravelTime = await prisma.travelTime.findMany()
    if (existingTravelTime.length === 0) {
        await prisma.travelTime.createMany({
            data: [
                { travelTime: "3 day" },
                { travelTime: "4 day" },
                { travelTime: "More than 5 day" }
            ]
        })
    }

    const existingSports = await prisma.sports.findMany()
    if (existingSports.length === 0) {
        await prisma.sports.createMany({
            data: [
                { sport: "Football" },
                { sport: "Hockey" },
                { sport: "Athletics" },
                { sport: "Padel" }
            ]
        })
    }

    const existingUser = await prisma.user.findMany()
    if (existingUser.length === 0) {
           const data = {
            username: "example",
            email: "example@mail.com",
            password: "123456789Po!",
            role: "admin"
        }
            const userServices = new UserServices()
            await userServices.create(data)
    }


    const existingRatings = await prisma.ratings.findMany()
    if (existingRatings.length === 0) {
        await prisma.ratings.createMany({
            data: [
                { rating: "1 Star" },
                { rating: "2 Stars" },
                { rating: "3 Stars" },
                { rating: "4 Stars" },
                { rating: "5 Stars" },
            ]
        })
    }
}