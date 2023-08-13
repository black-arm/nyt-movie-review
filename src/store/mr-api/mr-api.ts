import { MovieQuery, MrResponse, Reviewer } from "@/model"
import { MovieReview } from "@/model/movieReview"
import { formatDateRange } from "@/utilities/format-date-range"
import axios from "axios"
import { mrEndpoints } from "./mr-endpoints"

export const apiKey = process.env.API_KEY

export const httpMovieReview = (movieQuery: MovieQuery) => {
    
    let publicationDate = ''
    if(movieQuery.startDate && movieQuery.endDate){
        publicationDate = formatDateRange(movieQuery.startDate, movieQuery.endDate)
    }

    return axios.get<MrResponse<MovieReview>>(mrEndpoints.movieReviewEndpoint, {
        params: {
            query: movieQuery.query,
            reviewer: movieQuery.reviewer,
            offset: movieQuery.offset,
            'publication-date': publicationDate,
            'api-key': apiKey
        }
    })
}

export const httpReviewer = (reviewer: string) => {
    return axios.get<MrResponse<Reviewer>>(mrEndpoints.reviewerEndpoint(reviewer), {
        params: {'api-key': apiKey}
    })
}