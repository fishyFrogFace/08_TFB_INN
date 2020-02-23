/// <reference types="Cypress" />

context('End-to-end', () => {
  before(() => {
    cy.visit('http://localhost:3000/')
  })

  it('front page contains an examination button', () => {
    cy.get('.btn')
      .first()
      .should('contain', 'Lvl 1')
  })

  it('front page contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible')
  })

  it('front page button is clickable and renders start button', () => {
    cy.get('.btn').first().click()

    cy.get('.btn')
      .first()
      .should('contain', 'Start')
  })

  it('start contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible')
  })

  it('start button is clickable and renders username input', () => {
    cy.get('.btn').first().click()

    cy.get('.h1')
      .first()
      .should('contain', 'Mitt navn er')
  })

  it('username input contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible')
  })

  it('username input button is clickable and renders result', () => {
    cy.get('.btn').first().click()

    cy.get('.h1')
      .first()
      .should('contain', 'Result')
  })

  it('result contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible')
  })

  it('a reload brings you to start page', () => {
    cy.reload()
    cy.get('.btn')
      .first()
      .should('contain', 'Lvl 1')

    // reload the page without using the cache
    //cy.reload(true)
  })
})