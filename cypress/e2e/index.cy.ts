import { MrResponse } from "@/model"
import { MovieReview } from "@/model/movieReview"

describe('index.tsx', () => {
    it('search movie', () => {
        cy.visit('/')
        
        cy.getByData('query').find('input').type('Super Mario')
        cy.getByData('search').click()
        cy.intercept('GET', '*').fixture('movie-response.json').as('movieResponse')
        /*cy.wait('@movieResponse').then(interception => {
            expect(interception.response?.statusCode).to.eq(200)
        })*/
        cy.getByData('viewList').should('exist')
            .getByData('movieItem')
            .should('have.length', 2)
        
    })

    
    it('search movie is empty', () => {
        /*cy.intercept('GET', '/reviews/search.json')
            .fixture('empty-response.json', {timeout: 10000}).as('empty')*/
        cy.visit('/')
        cy.getByData('query').find('input').type('Super Marios')
        cy.getByData('search').click()
        cy.getByData('viewList').contains('No movies found')
    })

    it('search movie by show more', () => {
        cy.visit('/')
        cy.getByData('query').find('input').type('Kill')
        cy.getByData('search').click()
        cy.getByData('showMore').should('exist')
            .click()

            cy.getByData('viewList').should('exist')
            .getByData('movieItem')
            .should('have.length.greaterThan', 20)
    })
})