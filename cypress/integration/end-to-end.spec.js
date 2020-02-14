/// <reference types="Cypress" />

context('End-to-end', () => {
    before(() => {
      cy.visit('http://localhost:3000/')
    })

    it('start page contains a start button', () => {
        cy.get('.btn')
          .first()
          .should('contain', 'Start')
    })

    it('start page contains a navigation menu', () => {
      cy.get('.navBar').first()
    })

    it('start button is clickable and renders 2nd component', () => {
    cy.get('.btn').first().click()

    cy.get('.imageContainer')
      .first().children()
      .first()
      .should('be.visible')
      .and('have.attr', 'alt')
    })

    it('2nd page contains a navigation menu', () => {
      cy.get('.navBar').first()
    })

    it('a reload brings you to start page', () => {
        cy.reload()
        cy.get('.btn')
          .first()
          .should('contain', 'Start')
    
        // reload the page without using the cache
        //cy.reload(true)
    })

  })
  