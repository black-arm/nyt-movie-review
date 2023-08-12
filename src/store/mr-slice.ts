import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { fetchMovieReviewByMovieQuery } from "./mr-async-thunks";

export const movieReviewSlice = createSlice({
    name: 'movieReview',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovieReviewByMovieQuery.pending, (state, action) => {
            state.loading = 'pending'
        }),
        builder.addCase(fetchMovieReviewByMovieQuery.rejected, (state, action) => {
            state.loading = 'failed',
            
            state.errorMessage = action.payload as string ? action.payload as string: null;
        }),
        builder.addCase(fetchMovieReviewByMovieQuery.fulfilled, (state, action) => {
            state.loading = 'succeded',
            state.movies?.concat(action.payload.results)
        })
    }
})

export const mrReducer = movieReviewSlice.reducer;