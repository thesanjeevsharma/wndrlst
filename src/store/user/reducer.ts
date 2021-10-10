import type { User, Session } from 'types/users'
import { FETCH_USER_DATA, LOGIN_USER, LOGOUT_USER } from './actions'

import { RESTAURANT_LIKE_TOGGLED } from '../restaurants/actions'

type State = {
  user: User | null
  session: Session | null
  likedRestaurants: number[]
}

const initialState: State = {
  user: null,
  session: null,
  likedRestaurants: [],
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        user: action.payload.user,
        session: action.payload.session,
      }
    }
    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        session: null,
      }
    }

    case FETCH_USER_DATA: {
      const likedRestaurants = action.payload.data
        .filter((like) => like.restaurant_id)
        .map((like) => like.restaurant_id)

      return {
        ...state,
        likedRestaurants,
      }
    }

    case RESTAURANT_LIKE_TOGGLED: {
      if (action.payload.isLiked) {
        const updatedLikedRestaurants = [...state.likedRestaurants]
        updatedLikedRestaurants.push(action.payload.restaurantId)
        return {
          ...state,
          likedRestaurants: updatedLikedRestaurants,
        }
      }
      return {
        ...state,
        likedRestaurants: state.likedRestaurants.filter(
          (id) => id !== action.payload.restaurantId
        ),
      }
    }

    default:
      return state
  }
}
