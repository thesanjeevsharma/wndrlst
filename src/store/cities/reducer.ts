import { CITY_ERROR, FETCHING_CITY, FETCH_CITIES, FETCH_CITY, FETCH_POPULAR_CITIES } from "./actions";

import type { City, LeanCity } from "types/cities";

export type State = {
  cities: City[];
  popularCities: LeanCity[];
  city: City | null;
  meta: {
    isCitiesLoading: boolean;
    isPopularCitiesLoading: boolean;
    citiesError: null | string;
    popularCitiesError: null | string;
    isCityLoading: boolean;
    cityError: null | string;
  };
};

const initialState: State = {
  cities: [],
  popularCities: [],
  city: null,
  meta: {
    isCitiesLoading: true,
    isPopularCitiesLoading: true,
    citiesError: null,
    popularCitiesError: null,
    isCityLoading: true,
    cityError: null
  },
};

// TODO: type redux
export const citiesReducer = (state = initialState, action): State => {
  switch (action.type) {
    case FETCH_CITIES: {
      return {
        ...state,
        cities: action.payload.cities,
        meta: {
          ...state.meta,
          isCitiesLoading: false,
          citiesError: null,
        },
      };
    }
    case FETCH_POPULAR_CITIES: {
      return {
        ...state,
        popularCities: action.payload.cities,
        meta: {
          ...state.meta,
          isPopularCitiesLoading: false,
          popularCitiesError: null,
        },
      };
    }

    case FETCHING_CITY: {
      return {
        ...state,
        city: null,
        meta: {
          ...state.meta,
          isCityLoading: true,
          cityError: null
        }
      }
    }
    case FETCH_CITY: {
      return {
        ...state,
        city: action.payload.city,
        meta: {
          ...state.meta,
          isCityLoading: false,
          cityError: null
        }
      }
    }
    case CITY_ERROR: {
      return {
        ...state,
        city: null,
        meta: {
          ...state.meta,
          isCityLoading: false,
          cityError: action.payload.error
        }
      }
    }

    default:
      return state;
  }
};
