/// <reference types="Cypress" />

context('Passwords-and-login', () => {
  const subjectTitle = 'Passord, innlogging og BankID';
  const username = 'vaffelkjeks';
  const password = 'JegEr3nLitenFrosk:)';

  before(() => {
    cy.visit('http://localhost:3000/');

    // start examination
    cy.get('.startbutton').first().click();

    // skip writing name
    cy.get('.next-button').first().click();

    // skip choosing units
    cy.get('.next-button').first().click();
  });

  it('overview contains the subject', () => {
    cy.get('.subject-btn').eq(2).should('contain', subjectTitle);
  });

  it('subject button is clickable and renders create password', () => {
    cy.get('.subject-btn').eq(2).click();

    cy.get('.h2').eq(1).should('contain', 'Lag et sikkert passord');
  });

  it('question contains a navigation menu', () => {
    cy.get('.nav-img').first().should('be.visible');
  });

  it('password button is clickable and renders find secure pwd', () => {
    cy.get('.input-field').first().type('KokosBollerEr-Godt!1');

    cy.get('.next-button').first().click();

    cy.get('.h2').eq(1).should('contain', 'Hvilke to passord er mest sikre?');
  });

  it('find secure pwd button is clickable and renders login', () => {
    cy.get('.answer-btn').eq(2).click();

    cy.get('.next-button').first().click();

    cy.get('.h2').eq(1).should('contain', 'Logg inn med informasjonen under');
  });

  it('login contains user information', () => {
    cy.get('.question-details')
      .should('contain', username)
      .and('contain', password);
  });

  it('login button gives feedback to user', () => {
    cy.get('#username').first().type(password);

    cy.get('#password').first().type(username);

    cy.get('.next-button').first().click();

    cy.get('.feedback')
      .first()
      .should('contain', 'Feil passord eller brukernavn')
      .and('have.css', 'color', 'rgb(255, 87, 34)');

    cy.get('#username').first().clear().type(username);

    cy.get('#password').first().clear().type(password);

    cy.get('.next-button').first().click();

    cy.get('.feedback')
      .first()
      .should('contain', 'Gratulerer, du er nå logget inn!')
      .and('have.css', 'color', 'rgb(14, 73, 9)');
  });

  it('login button is clickable and renders true about login', () => {
    cy.get('.next-button').first().click();

    cy.get('.h2')
      .eq(1)
      .should('contain', 'Hva er sant når du har logget inn på en nettside?');
  });

  it('true about login button is clickable and renders pin code recognition', () => {
    cy.get('.answer-btn').eq(0).click();

    cy.get('.answer-btn').eq(3).click();

    cy.get('.next-button').first().click();

    cy.get('.h2').eq(1).should('contain', 'Klikk på PIN-koden(e)');
  });

  it('pin code recognition button is clickable and renders has bankid', () => {
    cy.get('.answer-btn').eq(0).click();

    cy.get('.answer-btn').eq(3).click();

    cy.get('.next-button').first().click();

    cy.get('.h2').eq(1).should('contain', 'Har du BankID (kodebrikke)?');
  });

  it('has bankid button is clickable and renders why bankid', () => {
    cy.get('.answer-btn').first().click();

    cy.get('.answer-btn').eq(1).click();

    cy.get('.next-button').first().click();

    cy.get('.h2')
      .eq(1)
      .should('contain', 'Har du brukt BankID (kodebrikke) alene før?');
  });

  it('has bankid button is clickable and renders used bankid alone', () => {
    cy.get('.answer-btn').first().click();

    cy.get('.next-button').first().click();

    cy.get('.h2')
      .eq(1)
      .should('contain', 'Jeg forstår hvorfor jeg trenger BankID');
  });

  it('used bankid alone button is clickable and renders true about bankid', () => {
    cy.get('.answer-btn').first().click();

    cy.get('.next-button').first().click();

    cy.get('.h2').eq(1).should('contain', 'Hva er sant om BankID?');
  });

  it('true about bankid button is clickable and renders success screen', () => {
    cy.get('.answer-btn').eq(1).click();

    cy.get('.answer-btn').eq(3).click();

    cy.get('.next-button').first().click();

    cy.get('.choice-title')
      .first()
      .should('contain', 'Du har fullført Passord, innlogging og BankID');
  });

  it('success screen 2 is clickable and renders overview', () => {
    cy.get('.next-button').first().click();

    cy.get('.subject-btn').eq(2).should('be.disabled');
  });

  it('overview button is clickable and renders result', () => {
    cy.get('.next-button').first().click();

    cy.get('.choice-title').first().should('contain', 'Resultat');

    cy.get('.download').first().click();
  });
});
