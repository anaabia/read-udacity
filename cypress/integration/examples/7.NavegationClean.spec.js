 /// <reference types="Cypress" />

context('Navigation post', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('cy.go() - Navegation betwen Categories', () => {
    cy.wait(1000)

    cy.get(':nth-child(3) > .MuiButton-label-45').click()
    cy.wait(1000)
    cy.url().should('contains', '/react');
    cy.get('a > .MuiCardContent-root-204').first().click({force: true})
    cy.wait(1000)
    cy.get('#action-delet-post > .post-icon').click()

    cy.wait(1000)

    cy.get(':nth-child(4) > .MuiButton-label-45').click()
    cy.wait(1000)
    cy.url().should('contains', '/redux');
    cy.get('a > .MuiCardContent-root-204').first().click({force: true})
    cy.wait(1000)
    cy.get('#action-delet-post > .post-icon').click()


    cy.wait(1000)

    cy.get(':nth-child(5) > .MuiButton-label-45').click()
    cy.wait(1000)

    cy.url().should('contains', '/udacity');
    cy.get('a > .MuiCardContent-root-204').first().click({force: true})
   cy.wait(1000)

    cy.get('#action-delet-post > .post-icon').click()

    cy.wait(1000)
  })
})
