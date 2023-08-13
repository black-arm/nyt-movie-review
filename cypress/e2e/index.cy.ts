
describe('index.tsx', () => {

    it('should showMore button and noMoviesBox not exist', () => {
        cy.visit('/')
        cy.getByData('showMoreBox').should('not.exist')
        cy.getByData('noMoviesBox').should('not.exist')
    })

    it('search movie', () => {
        cy.intercept('**/reviews/search.json*', (req) => { 
            req.reply({
                fixture: 'movie-response.json',
                delay: 3000
            })
        }).as('movieResponse')
        cy.visit('/')
        cy.getByData('query').find('input').type('Super Mario')
        cy.getByData('search').click()
        cy.getByData('spinner').should('exist')
        cy.wait('@movieResponse')
        cy.getByData('viewList').should('exist')
            .getByData('movieItem')
            .should('have.length', 2)
        
    })
    
    it('search movie is empty', () => {
        cy.intercept('**/reviews/search.json*', { fixture: 'empty-response.json'}).as('emptyResponse')
        cy.visit('/')
        cy.getByData('query').find('input').type('Super Marios')
        cy.getByData('search').click()
        cy.wait('@emptyResponse')
        cy.getByData('viewList').contains('No movies found')
    })

    it('search movie by show more', () => {
        cy.intercept('**/reviews/search.json*', { fixture: 'kill-response.json'}).as('movieResponse')
        cy.visit('/')
        cy.getByData('query').find('input').type('Kill')
        cy.getByData('search').click()
        cy.wait('@movieResponse')
        cy.getByData('showMore').should('exist')
            .click()
        cy.getByData('viewList').should('exist')
            .getByData('movieItem')
            .should('have.length.greaterThan', 20)
    })

    it('open reviewer modal', () => {
        cy.intercept('**/reviews/search.json*', { fixture: 'movie-response.json'}).as('movieResponse')
        cy.intercept('**/critics/**', { fixture: 'reviewer-response.json'}).as('reviewerResponse')
        cy.visit('/')
        cy.getByData('query').find('input').type('Kill Bill')
        cy.getByData('search').click()
        cy.wait('@movieResponse')
        cy.getByData('movieItem').eq(1).within($movieItem => {
            cy.wrap($movieItem).getByData('reviewer').find('span').click()
            cy.wait('@reviewerResponse')
        })
        cy.getByData('modalReviewer').should('exist')
        cy.getByData('modalButton').click()
        cy.getByData('modalReviewer').should('not.exist')
    })
})