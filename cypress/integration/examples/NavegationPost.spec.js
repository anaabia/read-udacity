 /// <reference types="Cypress" />

context('Navigation post', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('cy.go() - Navegation in post', () => {
    cy.wait(1000)

    cy.get('a > .MuiCardContent-root-204').first().click({force: true})
    cy.wait(1000)
    cy.get('#action-edit-post').click()
    cy.get('#standard-title').type('!!')
    cy.get('#standard-body').type(' ... ')

    cy.get('#form-save').click()
    cy.wait(1000)
    cy.get('#post-body').contains('...')

    cy.wait(1000)
  })
})
