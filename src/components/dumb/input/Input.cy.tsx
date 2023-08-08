import Input from "./Input";

describe('<Input />', () => {

    const inputTestId = 'emailInput'

    beforeEach(() => {
        cy.mount(<Input inputTestId={inputTestId} 
            type="email"
            inputId="email"
            label="Email" />)
    })

    it('input style requirements', () => {
        cy.inputTextStyleRequirements(inputTestId)
        
    })
    
    it('input have attribute type and id', () => {
        cy.getByData(inputTestId)
            .find('input')
            .should('have.attr', 'type', 'email')
            .should('have.attr', 'id', 'email')
    })

    it('label style requirements', () => {
        cy.labelStyleRequirements(inputTestId)
    })
    
    it('label have attribute for and text Email', () => {
        cy.getByData(inputTestId).find('label')
            .should('have.attr', 'for', 'email')
            .contains('Email')
    })

    it('Type email', () => {
        cy.getByData(inputTestId).find('input').type('asant.b12@gmail.com')
    })

    it('error email', () => {
        cy.mount(<Input inputTestId={inputTestId} 
            isInvalid={true}
            type="email"
            inputId="email"
            label="Email" >
                Insert Email
            </Input>)
        
        cy.getByData(inputTestId).find('span')
            .should(($span) => {
                const className = $span[0].className
                expect(className).to.match(/mrError/)
            })
            .should('have.text', 'Insert Email')

        cy.getByData(inputTestId).find('input')
            .should(($input) => {
                const className = $input[0].className;
                expect(className).to.match(/mrInvalid/)
            })
    })
})