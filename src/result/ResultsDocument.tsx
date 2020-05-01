import React from 'react';
import { StyleSheet, Document, Page } from '@react-pdf/renderer';
import ResultsDocumentTitle from './ResultsDocumentTitle';
import ResultsDocumentSubject from './ResultsDocumentSubject';
import { SubjectResult } from 'Types';
import ResultsDocumentUserInfo from './ResultsDocumentUserInfo';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20
  }
});

export interface Props {
  username: string;
  subjectResultsList: SubjectResult[];
  devices: string;
}

const ResultsDocument: React.FC<Props> = ({
  username,
  subjectResultsList,
  devices
}) => (
  <Document>
    <Page size='A4' style={styles.page} wrap>
      <ResultsDocumentTitle
        title='Resultat'
        name={username}
        date={new Date()}
      />
      <ResultsDocumentUserInfo devices={devices} />
      {subjectResultsList
        .filter(subjectResult => subjectResult.results.length > 0)
        .map((subjectResult, i) => {
          return <ResultsDocumentSubject subjectResult={subjectResult} />;
        })}
    </Page>
  </Document>
);

export default ResultsDocument;
