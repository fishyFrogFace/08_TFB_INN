import React from 'react';
import './ResultPage.css';
import ProgressBar from 'components/ProgressBar';
import { SubjectResult, QuestionResultType } from '../Types';
import { RootState } from 'redux/reducers';
import { connect } from 'react-redux';
import { joinAndCapitalize } from '../Util';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResultsDocument from '../result/ResultsDocument';
import Button from '../components/Button';

const subjectResults = (element: SubjectResult, i: number) => {
  return (
    <div key={i} className='subject-result'>
      <h2 className='h2'>{element.subjectTitle}</h2>
      {element.results.map((res, n) =>
        res.type === QuestionResultType.Mastery ? (
          <ProgressBar key={n} {...res} />
        ) : (
          <h2 className='h2 other' key={n}>
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
      <PDFDownloadLink document={<ResultsDocument username={props.username} subjectResultsList={props.results} devices={props.units} />} fileName="document.pdf">
        {({ blob, url, loading, error }) => (loading ?
          <Button classNames='btn download' onClick={() => {return}}>Gjør klart resultat...</Button>
          : <Button classNames='btn download' onClick={() => {return}}>Last ned resultat</Button>
        )}
      </PDFDownloadLink>
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
