import TopBar from "./topBar"

describe('<TopBar />', () => {

    it('render', ()=>{
        cy.mount(<TopBar />)
        cy.getByData('topBarBox').should('exist')
    })
})