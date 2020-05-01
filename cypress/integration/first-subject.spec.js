/// <reference types="Cypress" />

context('First-subject', () => {
  const subjectTitle = 'Introduksjon';

  Cypress.Commands.add(
    'fill',
    {
      prevSubject: 'element'
    },
    (subject, value) => {
      cy.wrap(subject)
        .invoke('val', value)
        .trigger('input')
        .trigger('change');
    }
  );

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

  it('where in image button is clickable and renders question for supervisor', () => {
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
      .should('contain', 'Har du noen spørsmål til veileder?');
  });

  it('question for supervisor contains a navigation menu', () => {
    cy.get('.nav-bar')
      .first()
      .should('be.visible');
  });

  it('question for supervisor button is clickable and renders success screen', () => {
    cy.get('.big-text')
      .first()
      .fill(
        `Super Mario Run[b] is a 2016 side-scrolling platform mobile game developed and published by Nintendo for iOS and 
        Android devices. The game represents one of Nintendo's first games developed for mobile devices, and one of the few instances
        that a game in the Mario series was officially released on non-Nintendo hardware.
        In Super Mario Run, the player controls Mario or other characters as they automatically run across the screen while timing 
        jumps to collect coins and dodge enemies and hazards. As a Super Mario title, contains a familiar plot whereby Mario must rescue 
        Princess Peach from Bowser and rebuild the destroyed Mushroom Kingdom. The game was produced by series creator Shigeru Miyamoto, 
        and was developed primarily by the same team that had developed New Super Mario Bros. for the Nintendo DS, featuring many similar 
        gameplay concepts adapted for ease of mobile controllers. Unlike many other mobile games that use a free-to-play approach, 
        Super Mario Run is offered as a free demo with an alternating price to unlock the rest of the game's remaining content. 
        It was released for iOS in December 2016 and for Android in March 2017.
        Super Mario Run received generally positive reviews by critics. Reviewers generally praised the game's replay value and 
        addictive gameplay, though common criticism was directed towards its comparatively high price in the mobile market, as well 
        as its required connectivity to the internet. The game became the fastest-growing app in iOS history, having been downloaded 
        more than 50 million times worldwide during its first week of release, and around 300 million times by 2018.`
      );

    cy.get('.next')
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
});
