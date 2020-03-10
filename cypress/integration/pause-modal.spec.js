/// <reference types="Cypress" />

context('Pause modal testing', () => {
  const username = 'smiling-panda';

  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('pause button renders pause modal', () => {
    cy.get('.examination-startbutton')
      .first()
      .click();

    cy.get('.pause')
      .first()
      .click();

    cy.get('.modal-content').should('be.visible');

    cy.get('.pause-btn')
      .first()
      .should('contain', 'Pause');
  });

  it('close button closes pause modal', () => {
    cy.get('.close-btn')
      .first()
      .click();

    cy.get('.modal-content').should('not.be.visible');

    cy.get('.pause')
      .first()
      .click();
  });

  it('x in corner closes pause modal', () => {
    cy.get('.close-btn')
      .first()
      .click();

    cy.get('.modal-content').should('not.be.visible');
  });

  // this test is long because localStorage gets purged between tests
  it('pause button renders front page, containing the paused exam and starting the paused exam brings you back where you were', () => {
    cy.get('.start')
      .first()
      .click();

    cy.get('.inputField')
      .first()
      .type(username);

    cy.get('.next')
      .first()
      .click();

    cy.get('.pause')
      .first()
      .click();

    cy.get('.pause-btn')
      .first()
      .click();

    cy.get('.modal-content').should('not.be.visible');

    cy.get('.paused-blurb')
      .first()
      .should('contain', username);

    cy.get('.examination-startbutton')
      .eq(1)
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'A, b: C.');
  });
});
