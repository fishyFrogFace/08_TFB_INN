/// <reference types="Cypress" />

context('Exit modal testing', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('exit button renders exit screen', () => {
    cy.get('.examination-startbutton')
      .first()
      .click();

    cy.get('.next')
      .first()
      .click();

    cy.get('.subject-btn')
      .first()
      .click();

    cy.get('.exit')
      .first()
      .click();

    cy.get('.choice-title').should('be.visible');

    cy.get('.pause-btn')
      .first()
      .should('contain', 'Pause');
  });

  it('close button closes exit screen', () => {
    cy.get('.close-btn')
      .first()
      .click();

    cy.get('.choice-title').should('not.be.visible');

    cy.get('.exit')
      .first()
      .click();
  });

  it('x in corner closes exit screen', () => {
    cy.get('.close-btn')
      .first()
      .click();

    cy.get('.choice-title').should('not.be.visible');

    cy.get('.exit')
      .first()
      .click();
  });

  it('exit button renders front page', () => {
    cy.get('.pause-btn')
      .first()
      .click();

    cy.get('.choice-title').should('not.be.visible');

    cy.get('.subject-btn')
      .first()
      .should('contain', 'Tema 1');
  });

  it('exit button renders exam page', () => {
    cy.get('.exit')
      .first()
      .click();

    cy.get('.exit-btn')
      .first()
      .click();

    cy.get('.choice-title').should('not.be.visible');

    cy.get('.examination-blurb')
      .first()
      .should('contain', 'Tittel');
  });
});
