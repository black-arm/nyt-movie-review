import MovieForm from "./movie-form"

describe('<MovieForm />', () => {

    beforeEach(() => {
        cy.mount(<MovieForm />)
    })

    it('style requirements', ()=> {
        cy.getByData('movieForm').should('have.attr', 'class')
            .and('match', /movieForm/)
        cy.getByData('buttonsBox').should('have.attr', 'class')
            .and('match', /buttons/)
        cy.getByData('searchButtonBox').should('have.attr', 'class')
            .and('match', /buttonItem/)
        cy.getByData('resetButtonBox').should('have.attr', 'class')
            .and('match', /buttonItem/)
    })

    it('fill movie input and click button', () => {
        const movieFormSubmit = cy.spy().as('movieFormSubmit')
        cy.mount(<MovieForm movieFormSubmit={movieFormSubmit}/>)
        cy.getByData('query').type('Mario Bros')
        cy.getByData('reviewer').type('A. O. Scott')
        cy.getByData('startDate').type('2022-12-22')
        cy.getByData('endDate').type('2022-12-31')
        cy.getByData('search').click();
        cy.get('@movieFormSubmit').should('have.been.called', 1)
    })

    it('reset input', () => {
        cy.getByData('query').type('Mario Bros')
        cy.getByData('reset').click()
        cy.getByData('query').should('have.value', '');
    })

    it('form validation', () => {
        cy.getByData('startDate').type('2022-12-22')
        cy.getByData('endDate').type('2021-12-31')
        cy.getByData('search').click();
        cy.getByData('query').contains('Insert Movie')
        cy.getByData('startDate').find('span').contains('Start Date greater than End Date')
        cy.getByData('endDate').find('span').contains('End Date smaller than Start Date')
    })
})