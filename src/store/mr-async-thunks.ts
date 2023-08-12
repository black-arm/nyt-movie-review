import { MovieQuery, MrError, MrResponse } from "@/model";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { movieReview } from "./mr-api/mr-api";
import { AxiosError } from "axios";

export const fetchMovieReviewByMovieQuery = createAsyncThunk('movie/fetchMovieReview', 
    async (movieQuery: MovieQuery, thunkApi) => {
        try{
            const response = await movieReview(movieQuery);
            return response.data
        } catch(error){
            const axiosError = error as AxiosError<MrError>
            return thunkApi.rejectWithValue(axiosError.response?.data.fault.faultstring)
        }
    })
