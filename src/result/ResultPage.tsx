import React from 'react';
import './ResultPage.css';
import { RootState } from 'redux/reducers';
import { connect } from 'react-redux';
import { joinAndCapitalize } from '../Util';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResultsDocument from '../result/ResultsDocument';
import Button from '../components/Button';

const ResultPage: React.FC<PropsFromRedux> = props => {
  return (
    <div className='result-container'>
      <h1 className='h1'>Resultat for {props.username}</h1>
      <PDFDownloadLink
        document={
          <ResultsDocument
            username={props.username}
            subjectResultsList={props.results}
            devices={props.units}
          />
        }
        fileName='document.pdf'>
        {({ blob, url, loading, error }) =>
          loading ? (
            <Button
              classNames='btn download'
              onClick={() => {
                return;
              }}>
              Gjør klart resultat...
            </Button>
          ) : (
            <Button
              classNames='btn download'
              onClick={() => {
                return;
              }}>
              Last ned resultat
            </Button>
          )
        }
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
