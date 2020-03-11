/// <reference types="Cypress" />

context('Delete paused exams', () => {
  const username = 'smiling-panda';

  before(() => {
    // Prepare a paused examination
    cy.visit('http://localhost:3000/');
    cy.get('.examination-startbutton')
      .first()
      .click();
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
    cy.get('.paused-blurb')
      .first()
      .should('contain', username);
  });

  it('delete button renders delete modal', () => {
    cy.get('.delete-button')
      .first()
      .click();
    
    cy.get('.modal-content').should('be.visible');

    cy.get('.delete-btn')
      .first()
      .should('contain', 'Slett');
  });

  it('close button closes delete modal', () => {
    cy.get('.delete-button')
      .first()
      .click();
    
    cy.get('.close-btn')
      .first()
      .click();

    cy.get('.modal-content').should('not.be.visible');
  });

  it('x in corner closes delete modal', () => {
    cy.get('.delete-button')
      .first()
      .click();

    cy.get('.close')
      .first()
      .click();

    cy.get('.modal-content').should('not.be.visible');
  });

  it('clicking delete hides the modal window and removes the paused examination', () => {
    cy.get('.delete-button')
      .first()
      .click();
    
    cy.get('.delete-btn')
      .first()
      .click();

    cy.get('.modal-content').should('not.be.visible');

    cy.get('.paused-blurb').should('not.exist');
  });
});