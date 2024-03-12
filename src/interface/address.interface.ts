export interface ICreateCountry {
    name: string;
}

export interface ICountry extends ICreateCountry {
    id: number;
}

export interface ICountryAndCities extends ICountry {
    cities: ICity[];
}

export interface ICity extends ICreateCity {
    id: number;
}

export interface ICreateCity {
    name: string;
    countryId: number;
}

export interface ICreatedCity {
    id: number;
    name: string;
    country: {
        id: number;
        name: string;
    };
}