import { MovieReview } from "@/model/movieReview"
import MovieItem from "./MovieItem"

describe('<MovieItem />', () => {

  let movieReview: MovieReview = {
    display_title: "The Super Mario Bros. Movie",
    mpaa_rating: "PG",
    critics_pick: 0,
    byline: "Calum Marsh",
    headline: "‘The Super Mario Bros. Movie’ Review: This Ain’t No Game",
    summary_short: "A famed video game character side-scrolls once again to the big screen in this bland, witless and flagrantly pandering animated comedy.",
    publication_date: "2023-04-05",
    opening_date: "2023-04-05",
    date_updated: "2023-04-05 14:17:03",
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
  }

  beforeEach(() =>{
    cy.viewport(1280, 780)
    cy.mount(<MovieItem movie={movieReview} />)
  })

  it('should to view movie info', () => {
    cy.getByData('date').should('have.text', '2023-04-05')
    cy.getByData('movie').find('h2').should('have.text', movieReview.headline)
    cy.getByData('reviewer').should('have.text', 'By ' + movieReview.byline)
    cy.getByData('image').find('img').should('have.attr', 'src', movieReview?.multimedia?.src ? movieReview.multimedia.src : '')
      .should('have.attr', 'width', movieReview?.multimedia?.width ? movieReview.multimedia.width : '')
      .should('have.attr', 'height', movieReview?.multimedia?.height ? movieReview.multimedia.height : '')
        
  })

  it('should view no photo available', () => {
    const movieReviewWithoutPhoto: MovieReview = {
      ...movieReview,
      multimedia: undefined
    }
    cy.mount(<MovieItem movie={movieReviewWithoutPhoto} />)
    cy.getByData('image').find('img').should('have.attr', 'src', '/images/no_photo_available.jpeg');
  })

  it('should click reviewer', () => {
    const clickReviewer = cy.spy().as('clickReviewer')
    cy.mount(<MovieItem movie={movieReview} clickReviewer={clickReviewer} />)
    cy.getByData('reviewer').find('span').click()
    cy.get('@clickReviewer').should('have.been.called', 1)
  })
})
