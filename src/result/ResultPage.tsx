import React from 'react';
import './ResultPage.css';
import ProgressBar from 'components/ProgressBar';
import { QuestionResult } from '../Types';

interface Props {
  username: string;
  result: QuestionResult[];
}

const ResultPage: React.FC<Props> = props => {
  return (
    <div className='resultContainer'>
      <h1 className='h1'>Resultat for {props.username}</h1>
      {props.result.map((element, i) => {
        return <ProgressBar key={i} {...element} />;
      })}
    </div>
  );
};

export default ResultPage;
