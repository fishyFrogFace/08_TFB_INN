import React from 'react';
import './FrontPage.css';
import logo from 'images/logo.svg';
import Button from 'components/Button';
import { updateAppPage } from 'redux/actions';
import { connectDispatch } from 'redux/util';
import { Page } from 'Types';

const description = `Velkommen til Digiklar, et kartleggingsverktøy for digital kompetanse.
    Når du trykker på startknappen nedenfor, vil kartleggingen starte.
    Om du vil komme tilbake til denne siden, kan du laste inn siden på nytt 
    eller trykke på det røde krysset i høyre hjørne.
    Nåværende kartlegging vil da slettes.`;

const FrontPage: React.FC<PropsFromRedux> = props => {
  return (
    <div className='frontpage-main'>
      <div className='frontpage-blurb'>
        <h1 className='frontpage-header'>Velkommen til Digiklar</h1>
        <img className='logo' src={logo} alt='Application logo' />
        <p className='blurb-description'>{description}</p>
        <Button
          classNames='start'
          onClick={() => props.updateAppPage(Page.Examination)}>
          Start
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
