import { MrResponse } from '@/model';
import { MovieReview } from '@/model/movieReview';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import { apiKey, baseUrl } from './mr-api';

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

export const mockNetworkResponse = () => {
    const mock = new MockAdapter(axios)

    mock.onGet(`${baseUrl}/reviews/search.json`, { params: {
      query: 'Super Mario Bros',
      reviewer: 'Antony Scott',
      'publication-date': '2023-04-05:2023-05-05',
      'api-key': apiKey

    }}).reply(200, getMoviesReview)
}

export const mockNetworkError = ()=>{

  const mock = new MockAdapter(axios)

    mock.onGet(`${baseUrl}/reviews/search.json`, { params: {
      query: 'Super Mario Bros',
      reviewer: 'Antony Scott',
      'publication-date': '2023-04-05:2023-05-05',
      'api-key': apiKey

    }}).reply(401, {
      fault: {
        faultstring: "Failed to resolve API Key variable request.queryparam.api-key",
        detail: {
          "errorcode": "steps.oauth.v2.FailedToResolveAPIKey"
        }
      }
    })
}
