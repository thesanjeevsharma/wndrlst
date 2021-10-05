import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunkMiddleware from "redux-thunk";

import { citiesReducer } from "./cities/reducer";

const rootReducer = combineReducers({
  cities: citiesReducer,
});

const devTools =
  process.env.NODE_ENV === "development"
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;

const enhancer = compose(applyMiddleware(thunkMiddleware), devTools);

export const store = createStore(rootReducer, enhancer);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
