import { MovieQuery, MrResponse, Reviewer } from "@/model"
import { MovieReview } from "@/model/movieReview"
import { formatDateRange } from "@/utilities/format-date-range"
import axios from "axios"

export const baseUrl = 'https://api.nytimes.com/svc/movies/v2'
export const apiKey = process.env.API_KEY

export const httpMovieReview = (movieQuery: MovieQuery) => {
    
    let publicationDate = ''
    if(movieQuery.startDate && movieQuery.endDate){
        publicationDate = formatDateRange(movieQuery.startDate, movieQuery.endDate)
    }

    return axios.get<MrResponse<MovieReview>>(`${baseUrl}/reviews/search.json`, {
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
    return axios.get<MrResponse<Reviewer>>(`${baseUrl}/critics/${reviewer}.json`, {
        params: {'api-key': apiKey}
    })
}