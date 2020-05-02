/// <reference types="Cypress" />

context('Exit modal testing', () => {
  const title = 'Velkommen til Digiklar';

  before(() => {
    cy.wait(10000); //try to let site load before starting the first test

    cy.visit('http://localhost:3000/');
    cy.get('.start')
      .first()
      .click();

    cy.get('.next')
      .first()
      .click();

    cy.get('.next')
      .first()
      .click();

    cy.get('.subject-btn')
      .first()
      .click();
  });

  it('exit button renders exit screen', () => {
    cy.get('.exit')
      .first()
      .click();

    cy.get('.choice-title').should('be.visible');

    cy.get('.pause-btn')
      .first()
      .should('contain', 'Til oversikt');
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
      .should('contain', 'Introduksjon');
  });

  it('exit button renders exam page', () => {
    cy.get('.exit')
      .first()
      .click();

    cy.get('.exit-btn')
      .first()
      .click();

    cy.get('.choice-title').should('not.be.visible');

    cy.get('.frontpage-header')
      .first()
      .should('contain', title);
  });

  it('has reloaded state after exit', () => {
    cy.get('.start')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Mitt navn er');
  });

  it('prevents user from not setting an username', () => {
    cy.get('.exit')
      .first()
      .click();

    cy.get('.exit-btn')
      .first()
      .click();

    cy.get('.frontpage-header')
      .first()
      .should('contain', title);
  });
});
