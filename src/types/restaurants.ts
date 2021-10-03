import { Review } from "./reviews";

export type Cuisine =
  | "American"
  | "Indian"
  | "Chinese"
  | "Italian"
  | "Continental";

export type Restaurant = {
  id: string;
  city_id: string;
  name: string;
  images: string[];
  address: string;
  cuisines?: Cuisine[];
  priceForTwo: number;
  likes: number;
  isVegan: boolean;
  reviews?: Review[];
};
