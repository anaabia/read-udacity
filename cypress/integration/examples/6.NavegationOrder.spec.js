/// <reference types="Cypress" />

context('Navigation order', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('cy.go() - order by like, comment and date', () => {
    cy.wait(1000)

    cy.get('.MuiSelect-select-139').click()
    cy.get('[data-value="voteScore"]').click()
    cy.wait(1000)
    
    cy.get('.MuiSelect-select-139').click()
    cy.get('[data-value="commentCount"]').click()
    cy.wait(1000)

    cy.get('.MuiSelect-select-139').click()
    cy.get('[data-value="timestamp"]').click()
    cy.wait(1000)
  })

})
