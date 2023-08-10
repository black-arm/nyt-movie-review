import Spinner from "./Spinner"

describe('<Spinner />', () => {

    it('should be style requirements', () => {
        cy.mount(<Spinner visible={true} />)
        cy.getByData('spinner').should('have.attr', 'class')
        .and('match', /spinnerContainer/)
        cy.getByData('spinner').find('div').should('have.attr', 'class')
        .and('match', /spinner/);
    })
})