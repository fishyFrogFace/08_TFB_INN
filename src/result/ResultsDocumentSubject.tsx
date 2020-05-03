import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { SubjectResult, Mastery, Points } from 'Types';
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

export const totalSubjectPoints = (subjectResult: SubjectResult) => {
  const masteryQuestions = subjectResult.results.filter(
    result => result.type === 'mastery'
  ).length;

  const totalFromPoints = subjectResult.results
    .filter(result => result.type === 'points')
    .map(result => (result as Points).maxPoints)
    .reduce((a, b) => a + b, 0);

  const totalPoints = masteryQuestions + totalFromPoints;

  return totalPoints;
};

export const totalAchievedPoints = (subjectResult: SubjectResult) => {
  const mastered = subjectResult.results
    .filter(result => result.type === 'mastery')
    .filter(result => (result as Mastery).mastered).length;

  const achievedFromPoints = subjectResult.results
    .filter(result => result.type === 'points')
    .map(result => (result as Points).pointsAchieved)
    .reduce((a, b) => a + b, 0);

  const totalAchieved = mastered + achievedFromPoints;

  return totalAchieved;
};

const ResultsDocumentSubject: React.FC<Props> = ({ subjectResult }) => {
  return (
    <View key={subjectResult.subjectTitle} style={styles.subject}>
      <Text style={styles.subjectTitle}>
        Tema: {subjectResult.subjectTitle}
      </Text>
      {subjectResult.results.map(questionResult => {
        return (
          <ResultsDocumentQuestion
            key={questionResult.common.resultTitle}
            questionResult={questionResult}
          />
        );
      })}
      <Text style={styles.numbers}>
        Poeng: {totalAchievedPoints(subjectResult)}/
        {totalSubjectPoints(subjectResult)}
      </Text>
    </View>
  );
};

export default ResultsDocumentSubject;
