import React from 'react';
import './ResultPage.css';
import ProgressBar from 'components/ProgressBar';
import { Result } from '../Types';

const ResultPage: React.FC<Result> = props => {
  return (
    <div className='resultContainer'>
      <h1 className='h1'>Resultat for {props.username}</h1>
      {props.results.map((element, i) => {
        return <ProgressBar key={i} {...element} />;
      })}
    </div>
  );
};

export default ResultPage;
