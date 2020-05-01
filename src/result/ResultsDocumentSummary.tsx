import React from 'react';
import { StyleSheet, View, Text, Image } from '@react-pdf/renderer';
import { SubjectResult, QuestionResultType, QuestionResult } from 'Types';
import ResultsDocumentQuestion from './ResultsDocumentQuestion';

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
  let totalMasteryQuestions = 0;
  let totalMastered = 0;
  subjectResultsList.forEach(
    subjectResult =>
      (totalMasteryQuestions += subjectResult.results.filter(
        result => result.type === QuestionResultType.Mastery
      ).length)
  );
  subjectResultsList.forEach(
    subjectResult =>
      (totalMastered += subjectResult.results.filter(
        result => result.type === QuestionResultType.Mastery && result.mastered
      ).length)
  );

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
