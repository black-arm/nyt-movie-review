import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { fetchMovieReviewByMovieQuery, fetchReviewer } from "./mr-async-thunks";
import { MovieQuery } from "@/model";

export const movieReviewSlice = createSlice({
    name: 'movieReview',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovieReviewByMovieQuery.pending, (state, action) => {
            state.loading = 'pending'
            if(action.meta.arg.isNew){
                state.movies = []
            }
        }),
        builder.addCase(fetchMovieReviewByMovieQuery.rejected, (state, action) => {
            state.loading = 'failed',
            
            state.errorMessage = action.payload as string ? action.payload as string: null;
        }),
        builder.addCase(fetchMovieReviewByMovieQuery.fulfilled, (state, action) => {
            state.loading = 'succeded',
            state.viewShowMore = action.payload.num_results === 20;
            state.movies = [...state.movies, ...action.payload.results]
        }),
        builder.addCase(fetchReviewer.pending, (state, action) =>{
            state.loading = 'pending'
        }),
        builder.addCase(fetchReviewer.rejected, (state, action) => {
            state.loading = 'failed'
            state.errorMessage = action.payload as string ? action.payload as string: null;
        }),
        builder.addCase(fetchReviewer.fulfilled, (state, action) => {
            state.loading = 'succeded'
            if(action.payload.num_results == 1){
                state.reviewer = action.payload.results[0]
            }

        })
    }
})

export const mrReducer = movieReviewSlice.reducer;