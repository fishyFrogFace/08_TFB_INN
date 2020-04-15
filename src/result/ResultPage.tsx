import React from 'react';
import './ResultPage.css';
import ProgressBar from 'components/ProgressBar';
import { SubjectResult, ExamState } from '../Types';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';

const generateSubjectResult = (subjectResults: Map<string, SubjectResult>, subjectName: string, i: number) => {
  const results = subjectResults.get(subjectName)!.results;
  return (
    <div key={i} className='subjectResult'>
      <h2 className='h2'>{subjectName}</h2>
      {results.map((res, n) => (
        <ProgressBar key={n} {...res} />
      ))}
    </div>
  );
};

const ResultPage: React.FC<ExamState> = ({ examDefinition, username, subjectResults }) => {
  // Find all subject names we have results for
  const subjectNames = examDefinition.subjects.map(s => s.name).filter(name => subjectResults.has(name));

  return (
    <div className='resultContainer'>
      <h1 className='h1'>Resultat for {username}</h1>
      {subjectNames.map((name, i) => generateSubjectResult(subjectResults, name, i))}
    </div>
  );
};

// Redux related:
const mapStateToProps = (store: RootState) => ({
  ...store.examState
});
const connector = connect(mapStateToProps);
export default connector(ResultPage);