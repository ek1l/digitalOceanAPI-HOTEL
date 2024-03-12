export interface ICreateHotel {
    name: string;
    description: any;
    ratingId: number;
    images?: string[];
    cityId: number;
    facilitiesIds: any;
    conditionIds: any;
    travelTimeIds: any;
    sportsIds: any;
    comment?: any
}

const description = {
    "destination": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
    "accommodation": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
    "activities": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
}

const comment = {
    "author": "Lorem",
    "comment": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
}