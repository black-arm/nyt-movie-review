import TopBar from "./TopBar"

describe('<TopBar />', () => {

    it('render', ()=>{
        cy.mount(<TopBar />)
        cy.getByData('topBarBox').should('exist')
    })
})