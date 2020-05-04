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
    eller trykke på det røde krysset i høyre hjørne.
    Da vil alle avgitte svar slettes.`;

const FrontPage: React.FC<PropsFromRedux> = props => {
  return (
    <div className='frontpage-main'>
      <div className='frontpage-blurb'>
        <h1 className='frontpage-header black'>Digiklar</h1>
        <div className='scrollContainer'>
          <p className='appIntro light-font'>{appIntro}</p>
          <img className='logo' src={logo} alt='Application logo' />
          <div className='descriptionContainer'>
            <p className='flowDescription'>{flowDescription}</p>
          </div>
        </div>

        <Button
          classNames='btn h2 startbutton white teal-background'
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
