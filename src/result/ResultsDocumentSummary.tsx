import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { SubjectResult } from 'Types';

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
  const totalMasteryQuestions = subjectResultsList
    .map(
      subjectResult =>
        subjectResult.results.filter(result => result.type === 'mastery').length
    )
    .reduce((a, b) => a + b, 0);

  const totalMastered = subjectResultsList
    .map(
      subjectResult =>
        subjectResult.results.filter(
          result => result.type === 'mastery' && result.mastered
        ).length
    )
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
        Totalt mestret: {totalMastered}/{totalMasteryQuestions}
      </Text>
    </View>
  );
};

export default ResultsDocumentSummary;
