import { Restaurant } from "./restaurants";

export type City = {
  id: string;
  name: string;
  image: string;
  description: string;
  population: number;
  area: number;
  currency: string;
  languages: string[];
  state: string;
  country: string;
  createdAt: string;
  isCovidFree: boolean;
  isHillStation: boolean;
  isBeachStation: boolean;
  restaurants: Restaurant[];
};

export type HomeCity = Pick<City, "id" | "name" | "image">;
