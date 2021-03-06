import React from 'react';
import './FrontPage.css';
import '../App.css';
import logo from 'images/logo.svg';
import Button from 'components/Button';
import { updateAppPage } from 'redux/actions';
import { connectDispatch } from 'redux/util';
import { Page } from 'Types';

const appIntro = 'Et kartleggingsverktøy for digital kompetanse';
const flowDescription = `Kartleggingen vil starte når du klikker på knappen nedenfor.
    Om du vil komme tilbake til denne siden, kan du laste inn siden på nytt 
    eller trykke på det grå krysset i venstre hjørne.
    Da vil alle avgitte svar slettes.`;

const FrontPage: React.FC<PropsFromRedux> = props => {
  console.log(`Digiklar  Copyright (C) 2020  Camilla Rygh, Erle Seljelid Sørlie, Svein Magnus 
  Vennevik Johansen, Adrian Gautham Joseph

  This program comes with ABSOLUTELY NO WARRANTY.

  This is free software, and you are welcome to redistribute it under certain conditions,
  see https://github.com/fishyFrogFace/08_TFB_INN/blob/master/LICENSE for details`);

  return (
    <div className='frontpage-main'>
      <div className='frontpage-blurb'>
        <h1 className='frontpage-header black'>Digiklar</h1>
        <div className='scroll-container'>
          <p className='app-intro light-font'>{appIntro}</p>
          <img className='logo' src={logo} alt='Application logo' />
          <div className='description-container'>
            <p>{flowDescription}</p>
          </div>
        </div>

        <Button
          classNames='regular-btn h2 startbutton white teal-background'
          onClick={() => props.updateAppPage(Page.Examination)}>
          Kom i gang!
        </Button>
      </div>
    </div>
  );
};

// Redux related:

const mapToDispatch = {
  updateAppPage
};

type PropsFromRedux = typeof mapToDispatch;

const connector = connectDispatch(mapToDispatch);

export default connector(FrontPage);
