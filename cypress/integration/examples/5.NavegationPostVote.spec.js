 /// <reference types="Cypress" />

context('Navigation post', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('cy.go() - Navegation post vote up', () => {
    cy.wait(1000)

    cy.get(':nth-child(2) > .MuiPaper-root-13 > a > .MuiCardContent-root-204 > .MuiTypography-h5-89 > .vote-score > #vote-info-post').then(($span) => {
        
      const vote = $span.text();

      cy.get(':nth-child(2) > .MuiPaper-root-13 > a > .MuiCardContent-root-204 > .MuiTypography-h5-89 > .vote-score > #vote-up-post > .post-icon').first().click({force: true})

      cy.wait(1000)

      const newVote = Number(vote) + Number(1)
      cy.get(':nth-child(2) > .MuiPaper-root-13 > a > .MuiCardContent-root-204 > .MuiTypography-h5-89 > .vote-score > #vote-info-post').contains(newVote)

    })
    cy.wait(1000)
  })

  it('cy.go() - Navegation post vote down', () => {
    cy.wait(1000)

    cy.get(':nth-child(2) > .MuiPaper-root-13 > a > .MuiCardContent-root-204 > .MuiTypography-h5-89 > .vote-score > #vote-info-post').then(($span) => {
        
      const vote = $span.text();

      cy.get(':nth-child(2) > .MuiPaper-root-13 > a > .MuiCardContent-root-204 > .MuiTypography-h5-89 > .vote-score > #vote-down-post').first().click({force: true})

      cy.wait(1000)

      const newVote = Number(vote) - Number(1)
      cy.get(':nth-child(2) > .MuiPaper-root-13 > a > .MuiCardContent-root-204 > .MuiTypography-h5-89 > .vote-score > #vote-info-post').contains(newVote)

    })
    cy.wait(1000)
  })
})
