import { LeanRestaurant, Restaurant } from 'types/restaurants'
import {
  FETCHING_RESTAURANT,
  FETCHING_RESTAURANTS,
  FETCH_RESTAURANT,
  FETCH_RESTAURANTS,
} from './actions'

type State = {
  city: {
    id: number
    name: string
  } | null
  restaurants: LeanRestaurant[]
  restaurant: Restaurant | null
  meta: {
    isRestaurantsLoading: boolean
    restaurantsError: null | string
    isRestaurantLoading: boolean
    restaurantError: null | string
  }
}

const initialState: State = {
  city: null,
  restaurants: [],
  restaurant: null,
  meta: {
    isRestaurantsLoading: true,
    restaurantsError: null,
    isRestaurantLoading: true,
    restaurantError: null,
  },
}

export const restaurantsReducer = (state: State = initialState, action) => {
  switch (action.type) {
    case FETCHING_RESTAURANTS: {
      return {
        ...state,
        city: null,
        restaurants: [],
        meta: {
          ...state.meta,
          isRestaurantsLoading: true,
          restaurantsError: null,
        },
      }
    }
    case FETCH_RESTAURANTS: {
      return {
        ...state,
        city: action.payload.city,
        restaurants: action.payload.restaurants,
        meta: {
          ...state.meta,
          isRestaurantsLoading: false,
          restaurantsError: null,
        },
      }
    }

    case FETCHING_RESTAURANT: {
      return {
        ...state,
        restaurant: null,
        meta: {
          ...state.meta,
          isRestaurantLoading: true,
          restaurantError: null,
        },
      }
    }
    case FETCH_RESTAURANT: {
      return {
        ...state,
        restaurant: action.payload.restaurant,
        meta: {
          ...state.meta,
          isRestaurantLoading: false,
          restaurantError: null,
        },
      }
    }

    default:
      return state
  }
}
