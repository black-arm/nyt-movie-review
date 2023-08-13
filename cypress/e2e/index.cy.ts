
describe('index.tsx', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('search movie', () => {
        
        cy.getByData('query').find('input').type('Super Mario')
        cy.getByData('search').click()
        cy.intercept('GET', '*').fixture('movie-response.json').as('movieResponse')
        cy.getByData('viewList').should('exist')
            .getByData('movieItem')
            .should('have.length', 2)
        
    })

    
    it('search movie is empty', () => {
        cy.getByData('query').find('input').type('Super Marios')
        cy.getByData('search').click()
        cy.getByData('viewList').contains('No movies found')
    })

    it('search movie by show more', () => {
        cy.getByData('query').find('input').type('Kill')
        cy.getByData('search').click()
        cy.getByData('showMore').should('exist')
            .click()

            cy.getByData('viewList').should('exist')
            .getByData('movieItem')
            .should('have.length.greaterThan', 20)
    })

    it.only('open reviewer modal', () => {
        cy.getByData('query').find('input').type('Kill Bill')
        cy.getByData('search').click()
        cy.getByData('movieItem').eq(1).within($movieItem => {
            cy.wrap($movieItem).getByData('reviewer').find('span').click()
        })
        cy.getByData('modalReviewer').should('exist')
        cy.getByData('modalButton').click()
        cy.getByData('modalReviewer').should('not.exist')
    })
})