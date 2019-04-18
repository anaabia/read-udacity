 /// <reference types="Cypress" />

context('Navigation order', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('cy.go() - Navegation in comment', () => {
    cy.wait(1000)

    cy.get('a > .MuiCardContent-root-204').first().click({force: true})
    cy.wait(1000)

    cy.get('#new-comment > .MuiButton-label-45').click()
    cy.wait(100)
    cy.get('#outlined-name').type('comment')
    cy.get('#standard-body').type('content comment')
    cy.get('#form-save').click()

    cy.get('#action-edit-comment-0 > .post-icon').click()
    cy.wait(100)
    cy.get('#outlined-name').type('comment edit')
    cy.get('#standard-body').type('content comment edit')
    cy.wait(100)

    cy.get('#form-save').click()

    cy.wait(1000)
  })

})
