import { FETCH_CITIES, FETCH_POPULAR_CITIES } from "./actions";

import type { City, HomeCity } from "types/cities";

export type State = {
  cities: City[];
  popularCities: HomeCity[];
  meta: {
    isCitiesLoading: boolean;
    isPopularCitiesLoading: boolean;
    citiesError: null | string;
    popularCitiesError: null | string;
  };
};

const initialState: State = {
  cities: [],
  popularCities: [],
  meta: {
    isCitiesLoading: true,
    isPopularCitiesLoading: true,
    citiesError: null,
    popularCitiesError: null,
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
    default:
      return state;
  }
};
