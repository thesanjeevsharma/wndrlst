import { Restaurant } from "./restaurants";

export type City = {
  id: string;
  name: string;
  images: string[];
  description: string;
  population: number;
  area: number;
  currency: string;
  languages: string[];
  state: string;
  country: string;
  createdAt: string;
  is_covid_free: boolean;
  is_hill_station: boolean;
  is_beach_station: boolean;
  restaurants: Restaurant[];
};

export type LeanCity = Pick<City, "id" | "name" | "images">;
