import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { SubjectResult } from 'Types';

// Create styles
const styles = StyleSheet.create({

});

export interface Props {
  subjectResult: SubjectResult;
}

const ResultsDocumentSubject: React.FC<Props> = ({ subjectResult }) => (
  <View>
    <Text>{subjectResult.subjectTitle}</Text>
  </View>
);

export default ResultsDocumentSubject