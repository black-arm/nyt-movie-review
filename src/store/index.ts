import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { movieReviewSlice, mrReducer } from "./mr-slice";

const rootReducer = combineReducers({
    movieReview: mrReducer
})

export const store = configureStore({
    reducer: rootReducer
})