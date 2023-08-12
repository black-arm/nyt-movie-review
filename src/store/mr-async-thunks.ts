import { MovieQuery, MrError } from "@/model";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpMovieReview, httpReviewer } from "./mr-api/mr-api";
import { AxiosError } from "axios";

export const fetchMovieReviewByMovieQuery = createAsyncThunk('movie/fetchMovieReview', 
    async ({movieQuery, isNew = false }: { movieQuery: MovieQuery, isNew?: boolean }, thunkApi) => {
        try{
            const response = await httpMovieReview(movieQuery);
            return response.data
        } catch(error){
            const axiosError = error as AxiosError<MrError>
            return thunkApi.rejectWithValue(axiosError.response?.data.fault.faultstring)
        }
    })

export const fetchReviewer = createAsyncThunk('movie/fetchReviewer', async (reviewer: string, thunkApi) =>{
    try {
        const response = await httpReviewer(reviewer)
        return response.data
    } catch(error) {
        const axiosError = error as AxiosError<MrError>
        return thunkApi.rejectWithValue(axiosError.response?.data.fault.faultstring)
    }
})