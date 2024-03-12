import { container } from "tsyringe";
import { HotelServices } from "../services/hotel.services";
import { UserServices } from "../services/user.services";
import { AddressServices } from "../services/address.services";
import { FacilitiesServices } from "../services/facilities.services";
import { ConditionServices } from "../services/condition.services";
import { SportService } from "../services/sports.services";
import { TravelTimeServices } from "../services/travelTime.services";
import { RatingServices } from "../services/rating.services";
import { GaleryServices } from "../services/galery.services";
import { TeamServices } from "../services/team.services";
import { NewsServices } from "../services/news.services";

container.registerSingleton("HotelServices", HotelServices)
container.registerSingleton("UserServices", UserServices)
container.registerSingleton("AddressServices", AddressServices)
container.registerSingleton("FacilitiesServices", FacilitiesServices)
container.registerSingleton("ConditionServices", ConditionServices)
container.registerSingleton("SportServices", SportService)
container.registerSingleton("TravelTimeServices", TravelTimeServices)
container.registerSingleton("RatingServices", RatingServices)
container.registerSingleton("GaleryServices", GaleryServices)
container.registerSingleton("TeamServices", TeamServices)
container.registerSingleton("NewsServices", NewsServices)