import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { SubjectResult } from 'Types';

// Create styles
const styles = StyleSheet.create({

});

export interface Props {
  subjectName: string;
  subjectResult: SubjectResult;
}

const ResultsDocumentSubject: React.FC<Props> = ({ subjectName, subjectResult }) => (
  <View>
    <Text>{subjectName}</Text>
  </View>
);

export default ResultsDocumentSubject