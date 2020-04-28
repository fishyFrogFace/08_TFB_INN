import React from 'react';
import { StyleSheet, Document, Page, View, Text } from '@react-pdf/renderer';
import ResultsDocumentTitle from './ResultsDocumentTitle';
import ResultsDocumentSubject from './ResultsDocumentSubject';
import { SubjectResult } from 'Types';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 10
  }
});

export interface Props {
  username: string;
  subjectResultsList: SubjectResult[];
}

const ResultsDocument: React.FC<Props> = ({ username, subjectResultsList }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <ResultsDocumentTitle title="Tittel" name={username} date={new Date()} />
      {subjectResultsList.map((subjectResult, i) => {
        return <ResultsDocumentSubject key={i} subjectResult={subjectResult} />
      })}
    </Page>
  </Document>
);

export default ResultsDocument;