import React from 'react';
import './ResultPage.css';
import ProgressBar from 'components/ProgressBar';
import { SubjectResult } from '../Types';
import { RootState } from 'redux/reducers';
import { connect } from 'react-redux';

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

const ResultPage: React.FC<PropsFromRedux> = props => {
  return (
    <div className='resultContainer'>
      <h1 className='h1'>Resultat for {props.username}</h1>
      <h2 className='h2'>Har følgende enheter: {props.units.length === 0 ? 'Ingen' : props.units.join(', ')}</h2>
      {props.results
        .filter(res => res.results.length !== 0)
        .map((subject, i) => subjectResults(subject, i))}
    </div>
  );
};

// Redux related:

const mapStateToProps = (store: RootState) => ({
  username: store.username,
  units: store.units,
  results: store.subjectResultList
});

type PropsFromRedux = ReturnType<typeof mapStateToProps>;

const connector = connect(mapStateToProps);

export default connector(ResultPage);
