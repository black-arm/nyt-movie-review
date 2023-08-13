import { MovieQuery, MrResponse } from "@/model"
import { store } from "."
import { fetchMovieReviewByMovieQuery, fetchReviewer } from "./mr-async-thunks"
import { MovieReview } from "@/model/movieReview"
import { getReviewer, mockMovieReviewNetworkResponse, mockMovieReviewNetworkResponseForShowMoreToTrue, mockNetworkError, mockReviewerNetworkResponse } from "./mr-api/mr-api.mock"

describe('mrReducer', () => {
    
    const movieQuery: MovieQuery = {
        query: 'Super Mario Bros',
        reviewer: 'Antony Scott',
        startDate: new Date('2023-04-05'),
        endDate: new Date('2023-05-05'),
        offset: 0
    }
    
    context('fetchMovieReviewByMovieQuery', () =>{

        it('should be able fetch movies', async () => {
            
            mockMovieReviewNetworkResponse()
    
            const result = await store.dispatch(fetchMovieReviewByMovieQuery({ movieQuery: movieQuery }))
           
            expect(result.type).to.equal('movie/fetchMovieReview/fulfilled')
            
            const response = result.payload as MrResponse<MovieReview>
            expect(response.status).to.equal('OK')
            expect(response.copyright).to.equal('copyright')
            expect(response.num_results).to.equal(2)

            const state = store.getState().movieReview
            expect(response.results).to.deep.equal(state.movies)
            expect(state.viewShowMore).to.equal(false)
        })
    
        it('should be rejected status', async () =>{
    
           mockNetworkError();
    
            const result = await store.dispatch(fetchMovieReviewByMovieQuery({ movieQuery: movieQuery }))
           
            expect(result.type).to.equal('movie/fetchMovieReview/rejected')
            const state = store.getState().movieReview
            expect(result.payload).to.equal(state.errorMessage)
        })

        it('should add items to movie', async () => {

            mockMovieReviewNetworkResponse()

            await store.dispatch(fetchMovieReviewByMovieQuery({movieQuery: movieQuery}))
            const state = store.getState().movieReview
            expect(state.movies?.length).to.equal(4)

        })

        it('should clear movies if the search is new', async () => {
            mockMovieReviewNetworkResponse()

            await store.dispatch(fetchMovieReviewByMovieQuery({ movieQuery: movieQuery, isNew: true}))
            const state = store.getState().movieReview
            expect(state.movies?.length).to.equal(2)
        })

        it('should viewShowMore to true', async () =>{
            mockMovieReviewNetworkResponseForShowMoreToTrue()
            const result = await store.dispatch(fetchMovieReviewByMovieQuery({ movieQuery: {
                ...movieQuery,
                offset: 20
            }, isNew: true }))
            console.log(result)
            expect(result.type).to.equal('movie/fetchMovieReview/fulfilled')
            const state = store.getState().movieReview
            expect(state.viewShowMore).to.true
        })
    })

    context('fetchReview', () => {

        it('should filled reviewer', async () => {
            const reviewer = 'A. O. Scott'
            mockReviewerNetworkResponse(reviewer)
            const result = await store.dispatch(fetchReviewer(reviewer))

            expect(result.type).to.equal('movie/fetchReviewer/fulfilled')

            const reviewerState = store.getState().movieReview.reviewer
            expect(reviewerState).to.deep.equal(getReviewer.results[0])
        })
    })
})