import { Review } from './reviews'

export type Cuisine =
  | 'American'
  | 'Indian'
  | 'Chinese'
  | 'Italian'
  | 'Continental'

export type Restaurant = {
  id: number
  city_id: string
  name: string
  images: string[]
  address: string
  cuisines?: Cuisine[]
  price_for_two: number
  likes: number
  is_vegan: boolean
  reviews?: Review[]
}

export type LeanRestaurant = Pick<
  Restaurant,
  'id' | 'name' | 'images' | 'address' | 'price_for_two' | 'likes'
>
