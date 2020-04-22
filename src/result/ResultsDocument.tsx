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
  subjectNames: string[];
  subjectResults: Map<string, SubjectResult>
}

const ResultsDocument: React.FC<Props> = ({ username, subjectNames, subjectResults }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <ResultsDocumentTitle title="Tittel" name={username} date={new Date()} />
      {subjectNames.filter(name => subjectResults.get(name) !== undefined).map((name, i) => {
        return <ResultsDocumentSubject key={i} subjectName={name} subjectResult={subjectResults.get(name)!} />
      })}
    </Page>
  </Document>
);

export default ResultsDocument;