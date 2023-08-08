
export function getByData(testId: string){
    return cy.get(`[data-testid=${testId}]`)
}

export function inputTextStyleRequirements(inputTestId: string){

    cy.getByData(inputTestId).find('input')
        .should('have.attr', 'class')
        .and('match', /mrInput/)
}

export function labelStyleRequirements(inputTestId: string){
    cy.getByData(inputTestId)
        .find('label')
        .should('have.attr', 'class')
        .and('match', /mrLabel/)
}