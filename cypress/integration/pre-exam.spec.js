/// <reference types="Cypress" />

context('Pre-exam', () => {
  const username = 'little-kangaroo';
  const title = 'Tittel';
  const subjectTitle = 'Tema 1';

  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('front page contains an examination blurb', () => {
    cy.get('.examination-blurb')
      .first()
      .should('contain', title);
  });

  it('examination blurb button is clickable, the start page renders username input', () => {
    cy.get('.examination-startbutton')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Mitt navn er');
  });

  it('username input contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
  });

  it('username is visible when typing', () => {
    cy.get('.inputField')
      .first()
      .type(username);

    cy.get('.username')
      .first()
      .should('contain', username);
  });

  it('username button is clickable and renders what units', () => {
    cy.get('.next')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Hvilke enheter har du?');
  });

  it('what units contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
  });

  it('what units buttons are clickable', () => {
    cy.get('.unit-btn')
      .first()
      .click()
      .click();

    cy.get('.unit-btn')
      .eq(1)
      .click();

    cy.get('.unit-btn')
      .eq(2)
      .click();
  });

  it('what units is clickable and renders overview', () => {
    cy.get('.next')
      .first()
      .click();

    cy.get('.subject-btn')
      .first()
      .should('contain', subjectTitle);
  });

  it('overview contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
  });

  it('overview button is clickable and renders result', () => {
    cy.get('.next')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Resultat')
      .and('contain', username);
  });

  it('result contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
  });

  it('result reflects what units were chosen', () => {
    cy.get('.h2')
      .first()
      .should('contain', 'Laptop, nettbrett')
      .and('not.contain', 'marttelefon');
  });

  it('a reload brings you to start page', () => {
    cy.reload();
    cy.get('.examination-blurb')
      .first()
      .should('contain', title);

    // reload the page without using the cache
    //cy.reload(true)
  });
});
