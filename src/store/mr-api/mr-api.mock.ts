import { MrResponse } from '@/model';
import { MovieReview } from '@/model/movieReview';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import { apiKey } from './mr-api';
import { mrEndpoints } from './mr-endpoints';

export const getMoviesReview: MrResponse<MovieReview> = {
    results: [{
        display_title: "The Super Mario Bros. Movie",
        mpaa_rating: "PG",
        critics_pick: 0,
        byline: "Calum Marsh",
        headline: "‘The Super Mario Bros. Movie’ Review: This Ain’t No Game",
        summary_short: "A famed video game character side-scrolls once again to the big screen in this bland, witless and flagrantly pandering animated comedy.",
        publication_date: new Date("2023-04-05"),
        opening_date: new Date("2023-04-05"),
        date_updated: new Date("2023-04-05"),
        link: {
          type: "article",
          url: "https://www.nytimes.com/2023/04/05/movies/the-super-mario-bros-movie-review.html",
          suggested_link_text: "Read the New York Times Review of The Super Mario Bros. Movie"
        },
        multimedia: {
          type: "mediumThreeByTwo210",
          src: "https://static01.nyt.com/images/2023/04/05/multimedia/05super-mario-bros-movie-hfvl/05super-mario-bros-movie-hfvl-mediumThreeByTwo440.jpg",
          height: 140,
          width: 210
        }
      },
      {
        display_title: "Super Mario Brothers",
        mpaa_rating: "PG",
        critics_pick: 0,
        byline: "Janet Maslin",
        headline: "SUPER MARIO BROTHERS (MOVIE)",
        summary_short: "Brooklyn dinosaurs, via video game. Human cast surprisingly unscathed.",
        publication_date: new Date("1993-05-29"),
        opening_date: new Date("1993-05-28"),
        date_updated: new Date("2017-11-02"),
        link: {
          type: "article",
          url: "https://www.nytimes.com/1993/05/29/movies/review-film-plumbing-a-video-game-to-its-depths.html",
          suggested_link_text: "Read the New York Times Review of Super Mario Brothers"
        },
        multimedia: null
      }],
    status: 'OK',
    copyright: 'copyright',
    num_results: 2
}
export const getReviewer = {
  status: "OK",
  copyright: "Copyright (c) 2023 The New York Times Company. All Rights Reserved.",
  num_results: 1,
  results: [
    {
      display_name: "A. O. Scott",
      sort_name: "A. O. Scott",
      status: "full-time",
      bio: "A. O. Scott joined The New York Times as a film critic in January 2000, and was named a chief critic in 2004. Previously, Mr. Scott had been the lead Sunday book reviewer for Newsday and a frequent contributor to Slate, The New York Review of Books, and many other publications. \n<br/><br/>\nIn the 1990s he served on the editorial staffs of Lingua Franca and The New York Review of Books. He also edited \"A Bolt from the Blue and Other Essays,\" a collection by Mary McCarthy, which was published by The New York Review of Books in 2002. \n<br/><br/>\nMr. Scott was a finalist for the Pulitzer Prize in Criticism in 2010, the same year he served as co-host (with Michael Phillips of the Chicago Tribune) on the last season of \"At the Movies,\" the syndicated film-reviewing program started by Roger Ebert and Gene Siskel.\n<br/><br/>\nA frequent presence on radio and television, Mr. Scott is Distinguished Professor of Film Criticism at Wesleyan University and the author of Better Living Through Criticism, forthcoming in 2016 from The Penguin Press. A collection of his film writing will be published by Penguin in 2017. \n<br/><br/>\nHe lives in Brooklyn with his family.",
      seo_name: "A-O-Scott",
      multimedia: {
        resource: {
          type: "image",
          src: "http://static01.nyt.com/images/2015/10/07/topics/ao-scott/ao-scott-articleInline.jpg",
          height: 163,
          width: 220,
          credit: "Earl Wilson/<br/>The New York Times"
        }
      }
    }
  ]
}

const movieReviewParams = {
  query: 'Super Mario Bros',
  reviewer: 'Antony Scott',
  offset: 0,
  'publication-date': '2023-04-05:2023-05-05',
  'api-key': apiKey
}

export const mockMovieReviewNetworkResponse = () => {
    const mock = new MockAdapter(axios)
    mock.onGet(mrEndpoints.movieReviewEndpoint, { params: movieReviewParams }).reply(200, getMoviesReview)
}

export const mockMovieReviewNetworkResponseForShowMoreToTrue = () => {
  const mock = new MockAdapter(axios)
  mock.onGet(mrEndpoints.movieReviewEndpoint, { params: {
    ...movieReviewParams,
    offset: 20  
  }}).reply(200, {
    ...getMoviesReview,
    results: [],
    num_results: 20
  })
}

export const mockNetworkError = ()=>{

  const mock = new MockAdapter(axios)

  mock.onGet(mrEndpoints.movieReviewEndpoint, { params: movieReviewParams }).reply(401, {
    fault: {
      faultstring: "Failed to resolve API Key variable request.queryparam.api-key",
      detail: {
        "errorcode": "steps.oauth.v2.FailedToResolveAPIKey"
      }
    }
  })
}

export const mockReviewerNetworkResponse = (reviewer: string) => {
  const mock = new MockAdapter(axios)
  mock.onGet(mrEndpoints.reviewerEndpoint(reviewer)).reply(200, getReviewer)
}
