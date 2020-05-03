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
    <div className='content'>
      <div className='choiceContent whiteBackground'>
        <p className='choice-title'>Resultat for {props.username}</p>
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
                classNames='download btn white bluegrey-background'
                onClick={() => {
                  return;
                }}>
                Gjør klart resultat...
              </Button>
            ) : (
              <Button
                classNames='download btn white teal-background'
                onClick={() => {
                  return;
                }}>
                Last ned resultat
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
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
