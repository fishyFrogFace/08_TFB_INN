/// <reference types="Cypress" />

context('Passwords-and-login', () => {
  const subjectTitle = 'Passord og innlogging';
  const username = 'vaffelkjeks'
  const password = 'JegEr1LitenFrosk:)'

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
      .eq(1)
      .should('contain', subjectTitle);
  });

  it('subject button is clickable and renders create password', () => {
    cy.get('.subject-btn')
      .eq(1)
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Lag et sikkert passord');
  });

  it('create password contains a navigation menu', () => {
    cy.get('.nav-bar')
      .first()
      .should('be.visible');
  });

  it('password button is clickable and renders find secure pwd', () => {
    cy.get('.input-field')
      .first()
      .type('KokosBollerEr-Godt!1');

    cy.get('.next')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Hvilke(t) passord er mest sikkert?');
  });

  it('find secure pwd contains a navigation menu', () => {
    cy.get('.nav-bar')
      .first()
      .should('be.visible');
  });

  it('find secure pwd button is clickable and renders login', () => {
    cy.get('.answer-btn')
      .eq(2)
      .click();

    cy.get('.next')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', "Logg inn med informasjonen under");
  });

  it('login contains a navigation menu', () => {
    cy.get('.nav-bar')
      .first()
      .should('be.visible');
  });

  it('login contains user information', () => {
    const info = [username, password];
    cy.get('.h2').each(($el, i) => {
      cy.wrap($el).should('contain', info[i]).and('be.visible');
    });
  });

  it('login button is clickable and renders success screen', () => {
    cy.get('.username')
      .first()
      .type(username);

      cy.get('.password')
      .first()
      .type(password);

    cy.get('.next')
      .first()
      .click();

    cy.get('.h2')
      .eq(2)
      .should('contain', "Gratulerer, du er logget inn!");
  });

  it('login button is clickable and renders success screen', () => {
    cy.get('.next')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', "Du har fullført 'Passord og innlogging'!");
  });

  it('success screen 2 contains a navigation menu', () => {
    cy.get('.nav-bar')
      .first()
      .should('be.visible');
  });

  it('success screen 2 is clickable and renders overview', () => {
    cy.get('.next')
      .first()
      .click();

    cy.get('.subject-btn')
      .eq(1)
      .should('be.disabled');
  });

  it('overview button is clickable and renders result', () => {
    cy.get('.next')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Resultat');
  });

  it('result reflects what the user achieved', () => {
    const width = ['400px', '200px', '400px'];
    cy.get('.filler').each(($el, i) => {
      cy.wrap($el).should('have.css', 'width', width[i]);
    });
  });
});
