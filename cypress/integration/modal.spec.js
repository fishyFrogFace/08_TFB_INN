/// <reference types="Cypress" />

context('Modal testing', () => {

  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('exit button renders modal', () => {
    cy.get('.examination-startbutton')
      .first()
      .click();

    cy.get('.exit')
      .first()
      .should('contain', '×')
      .click();

    cy.get('.modal-content')
      .should('be.visible')
  });

  it('close button closes modal', () => {
    cy.get('.close-btn')
      .first()
      .click();

    cy.get('.modal-content')
      .should('not.be.visible')

    cy.get('.exit')
      .first()
      .click();
  });

  it('x in corner closes modal', () => {
    cy.get('.close-btn')
      .first()
      .click();

    cy.get('.modal-content')
      .should('not.be.visible')

    cy.get('.exit')
      .first()
      .click();
  });

  it('exit button renders front page', () => {
    cy.get('.exit-btn')
      .first()
      .click();

    cy.get('.modal-content')
      .should('not.be.visible')

    cy.get('.examination-blurb')
      .first()
      .should('contain', 'Level 1');
  });
});