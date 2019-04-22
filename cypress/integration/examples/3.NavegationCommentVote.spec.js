   /// <reference types="Cypress" />

context('Navigation post', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('a > .MuiCardContent-root-204').first().click({force: true})
    cy.wait(1000)
  })

  it('cy.go() - Navegation comment vote up', () => {
    cy.wait(1000)

    cy.get('#vote-info-comment-0').then(($span) => {
        
      const vote = $span.text();

      cy.get('#vote-up-comment-0').first().click({force: true})
      cy.wait(1000)

      const newVote = Number(vote) + Number(1)
      cy.get('#vote-info-comment-0').contains(newVote)

    })
    cy.wait(1000)
  })

  it('cy.go() - Navegation comment vote down', () => {
    cy.wait(1000)

    cy.get('#vote-info-comment-0').then(($span) => {
        
      const vote = $span.text();

      cy.get('#vote-down-comment-0').first().click({force: true})
      cy.wait(1000)

      const newVote = Number(vote) - Number(1)
      cy.get('#vote-info-comment-0').contains(newVote)

    })
    cy.wait(1000)
  })
})