/// <reference types="Cypress" />

context('Passwords-and-login', () => {
  const subjectTitle = 'Passord, innlogging og BankID';
  const username = 'vaffelkjeks';
  const password = 'JegEr1LitenFrosk:)';

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

  it('password button is clickable and renders find secure pwd', () => {
    cy.get('.input-field')
      .first()
      .type('KokosBollerEr-Godt!1');

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Hvilke passord er mest sikre?');
  });

  it('find secure pwd button is clickable and renders login', () => {
    cy.get('.answer-btn')
      .eq(2)
      .click();

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Logg inn med informasjonen under');
  });

  it('login contains user information', () => {
    const info = [username, password];
    cy.get('.h2').each(($el, i) => {
      cy.wrap($el)
        .should('contain', info[i])
        .and('be.visible');
    });
  });

  it('login button gives feedback to user', () => {
    cy.get('#username')
      .first()
      .type(password);

    cy.get('#password')
      .first()
      .type(username);

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.feedback')
      .first()
      .should('contain', 'Feil passord eller brukernavn')
      .and('have.css', 'color', 'rgb(255, 0, 0)');

    cy.get('#username')
      .first()
      .clear()
      .type(username);

    cy.get('#password')
      .first()
      .clear()
      .type(password);

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.feedback')
      .first()
      .should('contain', 'Gratulerer, du er nå logget inn!')
      .and('have.css', 'color', 'rgb(0, 128, 0)');
  });

  it('login button is clickable and renders true about login', () => {
    cy.get('.next-button')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', 'Hva er sant når du har logget inn på en nettside?');
  });

  it('true about login button is clickable and renders pin code recognition', () => {
    cy.get('.answer-btn')
      .eq(1)
      .click();

    cy.get('.answer-btn')
      .eq(2)
      .click();

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', "Klikk på PIN-koden(e)");
  });

  it('pin code recognition button is clickable and renders has bankid', () => {
    cy.get('.answer-btn')
      .eq(1)
      .click();

    cy.get('.answer-btn')
      .eq(4)
      .click();

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', "Har du BankID (kodebrikke)?");
  });

  it('has bankid button is clickable and renders why bankid', () => {
    cy.get('.answer-btn')
      .first()
      .click();

      cy.get('.answer-btn')
      .eq(1)
      .click();

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', "Har du brukt BankID (kodebrikke) alene før?");
  });

  it('has bankid button is clickable and renders used bankid alone', () => {
    cy.get('.answer-btn')
      .first()
      .click();

      cy.get('.answer-btn')
      .eq(1)
      .click();

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', "Jeg forstår hvorfor jeg trenger BankID");
  });

  it('used bankid alone button is clickable and renders true about bankid', () => {
    cy.get('.answer-btn')
      .eq(1)
      .click();

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', "Hva er sant om BankID?");
  });

  it('true about bankid button is clickable and renders success screen', () => {
    cy.get('.answer-btn')
      .eq(2)
      .click();

    cy.get('.answer-btn')
      .eq(4)
      .click();

    cy.get('.next-button')
      .first()
      .click();

    cy.get('.h1')
      .first()
      .should('contain', "Du har fullført 'Passord, innlogging og BankID'!");
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
    const width = ['400px', '200px', '320px', '0px', '400px', '266.65625px'];
    cy.get('.filler').each(($el, i) => {
      cy.wrap($el).should('have.css', 'width', width[i]);
    });
  });
});
