import React, { useState } from 'react';
import './ResultPage.css';
import ProgressBar from 'components/ProgressBar';
import { Result } from '../examination/Examination';

const ResultPage: React.FC<Result> = props => {
  return (
    <div className='resultContainer'>
      <h1 className='h1'>Resultat for {props.username}</h1>
      {props.results.map(element => {
        return <ProgressBar {...element} />;
      })}
    </div>
  );
};

export default ResultPage;
