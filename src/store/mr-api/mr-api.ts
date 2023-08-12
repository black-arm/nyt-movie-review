import { MovieQuery, MrResponse } from "@/model"
import { MovieReview } from "@/model/movieReview"
import { formatDateRange } from "@/utilities/format-date-range"
import axios from "axios"

export const baseUrl = 'https://api.nytimes.com/svc/movies/v2'
export const apiKey = 'DWCwOUF7qf7XOE3FGnn0kwoh6YVBOgHE'

export const movieReview = (movieQuery: MovieQuery) => {
    
    let publicationDate = ''
    if(movieQuery.startDate && movieQuery.endDate){
        publicationDate = formatDateRange(movieQuery.startDate, movieQuery.endDate)
    }

    return axios.get<MrResponse<MovieReview>>(`${baseUrl}/reviews/search.json`, {
        params: {
            query: movieQuery.query,
            reviewer: movieQuery.reviewer,
            'publication-date': publicationDate,
            'api-key': apiKey
        }
    })
}