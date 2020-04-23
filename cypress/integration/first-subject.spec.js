/// <reference types="Cypress" />

context('First-subject', () => {
  const username = 'little-kangaroo';
  const title = 'Tittel';
  const subjectTitle = 'Tema 1';

  before(() => {
    cy.visit('http://localhost:3000/');

    // start examination
    cy.get('.examination-startbutton')
      .first()
      .click();

    // skip writing name
    cy.get('.next')
      .first()
      .click();

    // skip choosing units
    cy.get('.next')
      .first()
      .click();
  });

  it('overview contains the subject', () => {
    cy.get('.subject-btn')
      .first()
      .should('contain', subjectTitle);
  });

  it('overview contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
  });

  it('subject button is clickable and renders start button', () => {
    cy.get('.subject-btn')
      .first()
      .click();

    cy.get('.start')
      .first()
      .should('contain', 'Start');
  });

  it('start contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
  });

  it('start button is clickable and renders copytext', () => {
    cy.get('.start')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'A, b: C.');
  });

  it('copytext contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
  });

  it('copytext button is clickable and renders where in image', () => {
    cy.get('.inputField')
      .first()
      .type('A, b: C');

    cy.get('.next')
      .first()
      .click();

    cy.get('.inputField')
      .first()
      .type('.');

    cy.get('.next')
      .first()
      .click();

    cy.get('.next')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Klikk på laderinngangen');
  });

  it('where in image contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
  });

  it('next button is not visible unless you click on the correct spot', () => {
    cy.get('.whereInPictureImg')
      .first()
      .click(50, 50);

    cy.get('.next')
      .first()
      .should('not.be.visible');

    cy.get('.whereInPictureImg')
      .first()
      .click(351, 262);

    cy.get('.next')
      .first()
      .should('be.visible');
  });

  it('where in image button is clickable and renders success screen', () => {
    cy.get('.next')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Du har fullført Tema 1!');
  });

  it('success screen contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
  });

  it('next button is clickable and renders overview', () => {
    cy.get('.next')
      .first()
      .click();

    cy.get('.subject-btn')
      .first()
      .should('contain', subjectTitle);
  });

  it('overview button is clickable and renders result', () => {
    cy.get('.next')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Resultat');
  });

  it('result reflects what units were chosen', () => {
    cy.get('.h2')
      .first()
      .should('contain', 'Ingen');
  });

  it('result reflects what the user achieved', () => {
    const width = ['400px', '333.328125px', '333.328125px'];
    cy.get('.filler').each(($el, i) => {
      cy.wrap($el).should('have.css', 'width', width[i]);
    });
  });
});
