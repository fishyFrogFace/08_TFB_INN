/// <reference types="Cypress" />

context('End-to-end', () => {
    before(() => {
      cy.visit('http://localhost:3000/')
    })

    it('front page contains an examination button', () => {
        cy.get('.btn')
          .first()
          .should('contain', 'Gerd - Lvl 1')
    })

    it('start page contains a navigation menu', () => {
      cy.get('.navBar')
      .first()
      .should('be.visible')
    })

    it('start button is clickable and renders 2nd component', () => {
    cy.get('.btn').first().click()

    cy.get('.h1')
      .first()
      .should('be.contain', 'Question component here')
    })

    it('2nd page contains a navigation menu', () => {
      cy.get('.navBar')
      .first()
      .should('be.visible')
    })

    it('a reload brings you to start page', () => {
        cy.reload()
        cy.get('.btn')
          .first()
          .should('contain', 'Gerd - Lvl 1')
    
        // reload the page without using the cache
        //cy.reload(true)
    })

  })
  