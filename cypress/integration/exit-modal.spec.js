/// <reference types="Cypress" />

context('Exit modal testing', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('exit button renders exit modal', () => {
    cy.get('.examination-startbutton')
      .first()
      .click();

    cy.get('.exit')
      .first()
      .click();

    cy.get('.modal-content').should('be.visible');

    cy.get('.exit-btn')
      .first()
      .should('contain', 'Avslutt');
  });

  it('close button closes exit modal', () => {
    cy.get('.close-btn')
      .first()
      .click();

    cy.get('.modal-content').should('not.be.visible');

    cy.get('.exit')
      .first()
      .click();
  });

  it('x in corner closes exit modal', () => {
    cy.get('.close-btn')
      .first()
      .click();

    cy.get('.modal-content').should('not.be.visible');

    cy.get('.exit')
      .first()
      .click();
  });

  it('exit button renders front page', () => {
    cy.get('.exit-btn')
      .first()
      .click();

    cy.get('.modal-content').should('not.be.visible');

    cy.get('.examination-blurb')
      .first()
      .should('contain', 'Tittel');
  });
});
