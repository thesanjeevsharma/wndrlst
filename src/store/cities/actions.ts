import supabase from 'supabase'
import * as Q from 'queries'

export const FETCH_CITIES = 'FETCH_CITIES'
export const FETCHING_CITY = 'FETCHING_CITY'
export const FETCH_CITY = 'FETCH_CITY'
export const CITY_ERROR = 'CITY_ERROR'
export const FETCH_POPULAR_CITIES = 'FETCH_POPULAR_CITIES'

export const fetchCity = (cityId: number) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCHING_CITY })
      const { data } = await supabase
        .from('cities')
        .select(Q.CITY)
        .eq('id', cityId)
      dispatch({ type: FETCH_CITY, payload: { city: data[0] } })
    } catch (error) {
      dispatch({ type: CITY_ERROR, payload: { error: error.message } })
    }
  }
}

export const fetchCities = () => {
  return async (dispatch) => {
    const { data } = await supabase.from('cities').select(Q.HOME_CITY)
    dispatch({ type: FETCH_CITIES, payload: { cities: data } })
  }
}

export const fetchPopularCities = () => {
  return async (dispatch) => {
    const { data } = await supabase
      .from('cities')
      .select(Q.HOME_CITY)
      .eq('is_popular', true)
    dispatch({ type: FETCH_POPULAR_CITIES, payload: { cities: data } })
  }
}
