import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { SubjectResult } from 'Types';
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
  }
});

export interface Props {
  subjectResult: SubjectResult;
}

const ResultsDocumentSubject: React.FC<Props> = ({ subjectResult }) => {
  const masteryQuestions = subjectResult.results.filter(
    result => result.type === 'mastery'
  ).length;

  const mastered = subjectResult.results
    .filter(result => result.type === 'mastery')
    .filter((result: any) => result.mastered).length;

  return (
    <View key={subjectResult.subjectTitle} style={styles.subject}>
      <Text style={styles.subjectTitle}>
        Tema: {subjectResult.subjectTitle}
      </Text>
      {subjectResult.results.map((questionResult, index) => {
        return (
          <ResultsDocumentQuestion
            key={questionResult.common.resultTitle}
            questionResult={questionResult}
          />
        );
      })}
      <Text style={styles.numbers}>
        Mestret: {mastered}/{masteryQuestions}
      </Text>
    </View>
  );
};

export default ResultsDocumentSubject;
