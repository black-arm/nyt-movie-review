import Button from "./Button"

describe('<Button />', () => { 

    const buttonTestId = 'searchTestId'

    beforeEach(() => {
        cy.mount(<Button buttonTestId={buttonTestId} type="button">Search</Button>)
    })

    it('button style requirements', () => {
        cy.getByData(buttonTestId) .should('have.attr', 'class')
        .and('match', /mrBlueButton/)
        .and('match', /mrGeneralButton/)
    })

    it('button have class mrBlackButton', () => {
        cy.mount(<Button buttonTestId={buttonTestId} color="black">Search</Button>)
        cy.getByData(buttonTestId) .should('have.attr', 'class')
        .and('match', /mrBlackButton/)
    })

    it('button click run event', () => {
        const onClickSpy = cy.spy().as('onClickSpy')
        cy.mount(<Button buttonTestId={buttonTestId} buttonClick={onClickSpy}>Search</Button>)
        cy.getByData(buttonTestId).click()
        cy.get('@onClickSpy').should('have.been.called', 1)
    })

    it('have type button', () => {
        cy.getByData(buttonTestId).should('have.attr', 'type', 'button')
    })
})