import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { movieReviewSlice, mrReducer } from "./mr-slice";
import { useDispatch,useSelector, TypedUseSelectorHook } from 'react-redux'


const rootReducer = combineReducers({
    movieReview: mrReducer,
    
})

export const store = configureStore({
    reducer: rootReducer,
})

export type MrDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useMrDispatch: () => MrDispatch = useDispatch
export const useMrSelector: TypedUseSelectorHook<RootState> = useSelector