/// <reference types="Cypress" />

context('First-subject', () => {
  const username = 'little-kangaroo';
  const title = 'Velkommen til Digiklar';
  const subjectTitle = 'Introduksjon';

  before(() => {
    cy.visit('http://localhost:3000/');

    // start examination
    cy.get('.start')
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
    cy.get('.nav-bar')
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
    cy.get('.nav-bar')
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
    cy.get('.nav-bar')
      .first()
      .should('be.visible');
  });

  it('copytext button is clickable and renders where in image', () => {
    cy.get('.input-field')
      .first()
      .type('A, b: C');

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.input-field')
      .first()
      .type('.');

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Klikk på laderinngangen');
  });

  it('where in image contains a navigation menu', () => {
    cy.get('.nav-bar')
      .first()
      .should('be.visible');
  });

  it('where in image button is clickable and renders success screen', () => {
    cy.get('.where-in-picture-img')
      .first()
      .click(50, 50);

    cy.get('.where-in-picture-img')
      .first()
      .click(351, 262);

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', "Du har fullført 'Introduksjon'!");
  });

  it('success screen contains a navigation menu', () => {
    cy.get('.nav-bar')
      .first()
      .should('be.visible');
  });

  it('success screen button is clickable and renders overview', () => {
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
    const width = ['800px', '666.65625px', '666.65625px'];
    cy.get('.filler').each(($el, i) => {
      cy.wrap($el).should('have.css', 'width', width[i]);
    });
  });
});
