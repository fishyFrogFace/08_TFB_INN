import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { SubjectResult } from 'Types';
import {
  totalSubjectPoints,
  totalAchievedPoints
} from './ResultsDocumentSubject';

// Create styles
const styles = StyleSheet.create({
  subject: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 10
  },
  numbers: {
    textAlign: 'right'
  },
  subjectTitle: {
    fontSize: 24,
    marginBottom: 5
  },
  heading: {
    fontSize: 18
  },
  listItem: {
    marginLeft: 24
  }
});

export interface Props {
  subjectResultsList: SubjectResult[];
}

const ResultsDocumentSummary: React.FC<Props> = ({ subjectResultsList }) => {
  const totalPointsAchieved = subjectResultsList
    .map(subjectResult => totalAchievedPoints(subjectResult))
    .reduce((a, b) => a + b, 0);
  const totalPointsPossible = subjectResultsList
    .map(subjectResult => totalSubjectPoints(subjectResult))
    .reduce((a, b) => a + b, 0);

  return (
    <View style={styles.subject}>
      <Text style={styles.subjectTitle}>Oppsummering</Text>
      <Text style={styles.heading}>Emner kartlagt:</Text>
      {subjectResultsList
        .filter(subjectResult => subjectResult.results.length > 0)
        .map((subjectResult, index) => {
          return (
            <Text key={index} style={styles.listItem}>
              {subjectResult.subjectTitle}
            </Text>
          );
        })}
      <Text style={styles.numbers}>
        Totalt mestret: {Math.round(100 * totalPointsAchieved / totalPointsPossible)}%
      </Text>
    </View>
  );
};

export default ResultsDocumentSummary;
