import React from 'react';
import './ResultPage.css';
import ProgressBar from 'components/ProgressBar';
import { SubjectResult } from '../Types';

interface Props {
  username: string;
  result: SubjectResult[];
}

const subjectResults = (element: SubjectResult, i: number) => {
  return (
    <div key={i} className='subjectResult'>
      <h2 className='h2'>{element.subjectTitle}</h2>
      {element.results.map((res, n) => (
        <ProgressBar key={n} {...res} />
      ))}
    </div>
  );
};

const ResultPage: React.FC<Props> = props => {
  return (
    <div className='resultContainer'>
      <h1 className='h1'>Resultat for {props.username}</h1>
      {props.result.map((subject, i) => subjectResults(subject, i))}
    </div>
  );
};

export default ResultPage;
