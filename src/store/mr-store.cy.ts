import { MovieQuery, MrResponse } from "@/model"
import { store } from "."
import { fetchMovieReviewByMovieQuery } from "./mr-async-thunks"
import { MovieReview } from "@/model/movieReview"
import { getMoviesReview, mockNetworkError, mockNetworkResponse } from "./mr-api/mr-api.mock"

describe('mrReducer', () => {
    
    const movieQuery: MovieQuery = {
        query: 'Super Mario Bros',
        reviewer: 'Antony Scott',
        startDate: new Date('2023-04-05'),
        endDate: new Date('2023-05-05')
    }
    
    it('should be able fetch movies', async () => {
        
        mockNetworkResponse()

        const result = await store.dispatch(fetchMovieReviewByMovieQuery(movieQuery))
       
        expect(result.type).to.equal('movie/fetchMovieReview/fulfilled')
        
        const response = result.payload as MrResponse<MovieReview>
        expect(response.status).to.equal('OK')
        expect(response.copyright).to.equal('copyright')
        expect(response.num_results).to.equal(2)
    })

    it('should be rejected status', async () =>{

       mockNetworkError();

        const result = await store.dispatch(fetchMovieReviewByMovieQuery(movieQuery))
       
        expect(result.type).to.equal('movie/fetchMovieReview/rejected')
        const state = store.getState().movieReview
        expect(result.payload).to.equal(state.errorMessage)
    })
})