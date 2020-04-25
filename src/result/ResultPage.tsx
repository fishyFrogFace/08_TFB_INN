import React from 'react';
import './ResultPage.css';
import ProgressBar from 'components/ProgressBar';
import { SubjectResult, QuestionResultType } from '../Types';
import { RootState } from 'redux/reducers';
import { connect } from 'react-redux';
import { joinAndCapitalize } from '../Util';

const subjectResults = (element: SubjectResult, i: number) => {
  return (
    <div key={i} className='subjectResult'>
      <h2 className='h2'>{element.subjectTitle}</h2>
      {element.results.map((res, n) =>
        res.type === QuestionResultType.Mastery ? (
          <ProgressBar key={n} {...res} />
        ) : (
          <h2 className='h2' key={i}>
            {res.resultTitle}: {joinAndCapitalize(res.answerValues)}
          </h2>
        )
      )}
    </div>
  );
};

const ResultPage: React.FC<PropsFromRedux> = props => {
  return (
    <div className='result-container'>
      <h1 className='h1'>Resultat for {props.username}</h1>
      <h2 className='h2'>
        Har følgende enheter: {props.units.length === 0 ? 'Ingen' : props.units}
      </h2>
      {props.results
        .filter(res => res.results.length !== 0)
        .map((subject, i) => subjectResults(subject, i))}
    </div>
  );
};

// Redux related:

const mapStateToProps = (store: RootState) => ({
  username: store.username,
  units: joinAndCapitalize(store.units),
  results: store.subjectResultList
});

type PropsFromRedux = ReturnType<typeof mapStateToProps>;

const connector = connect(mapStateToProps);

export default connector(ResultPage);
