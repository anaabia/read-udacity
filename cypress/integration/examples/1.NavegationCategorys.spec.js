/// <reference types="Cypress" />

context('Navigation category', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('cy.go() - Insert Posts category Udacity', () => {
    cy.wait(1000)

    cy.get(':nth-child(2) > .MuiButton-label-45').click()
    cy.wait(1000)
    cy.url().should('contains', '/');

    cy.get('#outlined-name').type('Cypress')
    cy.get('#standard-title').type('Udacity cypress')
    cy.get('.MuiSelect-select-139').click()
    cy.wait(1000)

    cy.get('[data-value="udacity"]').click()
    cy.wait(1000)

    cy.get('#standard-body').type('Teste input Udacity')
    cy.wait
    cy.get('#form-save').click()
    cy.wait(1000)

    cy.url().should('contains', '/udacity');
    cy.wait(1000)

    cy.get('#new-comment > .MuiButton-label-45').click()
    cy.wait(100)
    cy.get('#outlined-name').type('comment udacity')
    cy.get('#standard-body').type('content comment udacity')
    cy.get('#form-save').click()

  })

  it('cy.go() - Insert Posts category React', () => {
    cy.wait(1000)

    cy.get(':nth-child(2) > .MuiButton-label-45').click()
    cy.wait(1000)
    cy.url().should('contains', '/');

    cy.get('#outlined-name').type('Cypress')
    cy.get('#standard-title').type('React cypress')
    cy.get('.MuiSelect-select-139').click()
    cy.wait(1000)

    cy.get('[data-value="react"]').click()
    cy.wait(1000)

    cy.get('#standard-body').type('Teste input react')
    cy.wait
    cy.get('#form-save').click()
    cy.wait(1000)

    cy.url().should('contains', '/react');

    cy.get('#new-comment > .MuiButton-label-45').click()
    cy.wait(100)
    cy.get('#outlined-name').type('comment react')
    cy.get('#standard-body').type('content comment react')
    cy.get('#form-save').click()

  })

  it('cy.go() - Insert Posts category Redux', () => {
    cy.wait(1000)

    cy.get(':nth-child(2) > .MuiButton-label-45').click()
    cy.url().should('contains', '/');
    cy.wait(1000)

    cy.get('#outlined-name').type('Redux')
    cy.get('#standard-title').type('Redux cypress')
    cy.get('.MuiSelect-select-139').click()
    cy.get('[data-value="redux"]').click()
    cy.get('#standard-body').type('Teste input Redux')
    cy.wait
    cy.get('#form-save').click()
    cy.url().should('contains', '/redux');

    cy.wait(1000)

    cy.get('#new-comment > .MuiButton-label-45').click()
    cy.wait(100)
    cy.get('#outlined-name').type('comment redux')
    cy.get('#standard-body').type('content comment redux')
    cy.get('#form-save').click()

  })

  it('cy.go() - Navegation betwen Categories', () => {
    cy.wait(1000)

    cy.get(':nth-child(1) > .MuiButton-label-45').click()
    cy.url().should('contains', '/');
    cy.get('.MuiPaper-root-13 > a > .MuiCardContent-root-204').its('length').should('gt',0)

    cy.wait(1000)

    cy.get(':nth-child(3) > .MuiButton-label-45').click()
    cy.url().should('contains', '/react');
    cy.get('.MuiPaper-root-13 > a > .MuiCardContent-root-204').its('length').should('gt',0)

    cy.wait(1000)

    cy.get(':nth-child(4) > .MuiButton-label-45').click()
    cy.url().should('contains', '/redux');
    cy.get('.MuiPaper-root-13 > a > .MuiCardContent-root-204').its('length').should('gt',0)

    cy.wait(1000)

    cy.get(':nth-child(5) > .MuiButton-label-45').click()
    cy.url().should('contains', '/udacity');
    cy.get('.MuiPaper-root-13 > a > .MuiCardContent-root-204').its('length').should('gt',0)

    cy.wait(1000)
  })

})
