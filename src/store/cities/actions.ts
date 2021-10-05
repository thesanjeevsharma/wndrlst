import supabase from "supabase";

export const FETCH_CITIES = "FETCH_CITIES";
export const FETCH_POPULAR_CITIES = "FETCH_POPULAR_CITIES";

export const fetchCities = () => {
  return async (dispatch) => {
    const { data } = await supabase.from("cities").select("*");
    dispatch({ type: FETCH_CITIES, payload: { cities: data } });
  };
};

export const fetchPopularCities = () => {
  return async (dispatch) => {
    const { data } = await supabase
      .from("cities")
      .select("*")
      .eq("is_popular", true);
    dispatch({ type: FETCH_POPULAR_CITIES, payload: { cities: data } });
  };
};
