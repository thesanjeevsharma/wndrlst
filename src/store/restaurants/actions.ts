import supabase from "supabase"
import * as Q from 'queries'

export const FETCHING_RESTAURANTS = 'FETCHING_RESTAURANTS'
export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'
export const FETCHING_RESTAURANT = 'FETCHING_RESTAURANT'
export const FETCH_RESTAURANT = 'FETCH_RESTAURANT'

export const fetchRestaurants = (cityId: number) => async (dispatch) => {
    try {
        dispatch({ type: FETCHING_RESTAURANTS })
        const { data } = await supabase.from('cities').select(Q.RESTAURANTS).eq('id', cityId)
        const { restaurants, ...rest } = data[0]
        dispatch({ type: FETCH_RESTAURANTS, payload: { restaurants, city: rest } })
    } catch(error) {
        console.log(error)
    }
}

export const fetchRestaurant = (restaurantId: number) => async (dispatch) => {
    try {
        dispatch({ type: FETCHING_RESTAURANT })
        const { data } = await supabase.from('restaurants').select(Q.RESTAURANT).eq('id', restaurantId)
        dispatch({ type: FETCH_RESTAURANT, payload: { restaurant: data[0] } })
    } catch(error) {
        console.log(error)
    }
}