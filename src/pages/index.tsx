import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MovieForm from '@/components/smart/movie-form/movie-form'
import { MovieQuery } from '@/model'
import { fetchMovieReviewByMovieQuery } from '@/store/mr-async-thunks'
import { useMrDispatch, useMrSelector } from '@/store'
import MovieItem from '@/components/dumb/movieItem/MovieItem'
import Button from '@/components/dumb/button/Button'
import { useState } from 'react'
import TopBar from '@/components/dumb/topBar/topBar'
import Spinner from '@/components/dumb/spinner/Spinner'

export default function Home() {

  const [movieQuery, setMovieQuery] = useState<MovieQuery>()
  const dispatch = useMrDispatch()
  const movieReviews = useMrSelector((state) => state.movieReview.movies)
  const loading = useMrSelector(state => state.movieReview.loading)
  const viewShowMore = useMrSelector(state => state.movieReview.viewShowMore)

  const movieFormSubmit = async (movieQuery: MovieQuery) => {
    setMovieQuery({
      ...movieQuery,
      offset: 0
    })
    dispatch(fetchMovieReviewByMovieQuery({movieQuery: movieQuery, isNew: true }))
  }

  const showMoreClick =  () => {
    if(movieQuery?.offset !== undefined){
      const newMovieQuery: MovieQuery = {
        ...movieQuery,
        offset: movieQuery.offset + 20
      } 
      dispatch(fetchMovieReviewByMovieQuery({ movieQuery:  newMovieQuery}))
      setMovieQuery(newMovieQuery)
    }
  }

  return (
    <>
      <Spinner visible={loading === 'pending'}/>
      <Head>
        <title>Movie Review</title>
        <meta name="description" content="Movie Review app with NYT api" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar />
      <main className={`${styles.main}`}>
        <MovieForm movieFormSubmit={movieFormSubmit}/>
        {movieReviews && movieReviews.length > 0 ? <div data-testid='viewList'>
          {}
        </div>: null}
        {loading === 'succeded' ? <div data-testid='viewList'>
          {movieReviews ? movieReviews.map((movie, index) => <MovieItem key={index} movie={movie}/>): 
            <h3>No movies found</h3>}
          {viewShowMore ? <Button color='black' buttonTestId='showMore' buttonClick={showMoreClick}>Show More</Button>: null}
        </div> : null}
      </main>
    </>
  )
}
