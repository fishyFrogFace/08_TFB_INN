/// <reference types="Cypress" />

context('End-to-end', () => {
  const username = 'little-kangaroo';
  const title = 'Tittel';

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

    const colors = ['#f2f1f0', '#1da598', '#1da598'];

    cy.get('.unit-btn').each(($el, i) => {
      cy.wrap($el).should('have.css', 'background-color', colors[i]);
    });
  });

  it('what units is clickable and renders overview', () => {
    cy.get('.next')
      .first()
      .click();

    cy.get('.subject-btn')
      .first()
      .should('contain', 'Tema 1');
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
      .eq(1)
      .should('contain', 'Tema 2');
  });

  it('subject button is clickable and renders start 2 button', () => {
    cy.get('.subject-btn')
      .eq(1)
      .click();

    cy.get('.start')
      .first()
      .should('contain', 'Start');
  });

  it('start 2 contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
  });

  it('start 2 button is clickable and renders copytext 2', () => {
    cy.get('.start')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'This is totally another subject');
  });

  it('copytext 2 contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
  });

  it('copytext 2 button is clickable and renders success screen 2', () => {
    cy.get('.inputField')
      .first()
      .type('This is totally another subject');

    cy.get('.next')
      .first()
      .click();

    cy.get('.next')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Du har fullført Tema 2!');
  });

  it('success screen 2 contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
  });

  it('success screen 2 is clickable and renders overview', () => {
    cy.get('.next')
      .first()
      .click();

    cy.get('.subject-btn').each($el => {
      cy.wrap($el).should('be.disabled');
    });
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

  it('result reflects what the user achieved', () => {
    cy.get('.h2')
      .first()
      .should('contain', 'Laptop, Nettbrett')
      .and('not.contain', 'Smarttelefon');
  });

  it('result reflects what the user achieved', () => {
    const width = ['400px', '333.328125px', '333.328125px', '400px', '400px'];
    cy.get('.filler').each(($el, i) => {
      cy.wrap($el).should('have.css', 'width', width[i]);
    });
  });

  it('result contains a navigation menu', () => {
    cy.get('.navBar')
      .first()
      .should('be.visible');
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
