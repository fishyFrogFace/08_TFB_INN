import React from 'react';
import { StyleSheet, View, Text, Image } from '@react-pdf/renderer';
import { QuestionResult } from 'Types';

// Create styles
const styles = StyleSheet.create({
  question: {
    margin: 2
  },
  symbol: {
    width: 20,
    height: 20,
    marginRight: 4
  },
  lineWithImages: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  title: {
    fontSize: 18
  },
  extraInformation: {
    fontSize: 16,
    marginLeft: 48
  }
});

export interface Props {
  questionResult: QuestionResult;
}

const getSymbolPath = (questionResult: any) => {
  switch (questionResult.common.type) {
    case 'mastery':
      return (
        <Image
          style={styles.symbol}
          src={
            questionResult.mastered
              ? 'symbols/checkmark.png'
              : 'symbols/cross.png'
          }
        />
      );

    case 'points':
      switch (questionResult.pointsAchieved / questionResult.maxPoints) {
        case 0:
          return (
            <Image style={styles.symbol} src={'symbols/percentage-red.svg'} />
          );
        case 1:
          return (
            <Image style={styles.symbol} src={'symbols/percentage-green.svg'} />
          );
        default:
          return (
            <Image
              style={styles.symbol}
              src={'symbols/percentage-yellow.svg'}
            />
          );
      }

    case 'other':
      return <Image style={styles.symbol} src='symbols/circle.png' />;
  }
};

const ResultsDocumentQuestion: React.FC<Props> = ({ questionResult }) => {
  const isMastery = questionResult.common.type === 'mastery';
  const isPoints = questionResult.common.type === 'points';
  const isMasteryOrPoints = isMastery || isPoints;

  const pointsAchieved = (questionResult: any) =>
    `${questionResult.pointsAchieved} / ${questionResult.maxPoints}`;

  return (
    <View style={styles.question}>
      <View style={styles.lineWithImages}>
        {getSymbolPath(questionResult)}
        <Text style={styles.title}>
          {isMasteryOrPoints
            ? questionResult.common.resultTitle
            : questionResult.common.questionTitle}
        </Text>
      </View>
      {isMasteryOrPoints ? (
        <Text style={styles.extraInformation}>
          {isMastery
            ? `Spørsmål: ${questionResult.common.questionTitle}`
            : `Poeng oppådd: ${pointsAchieved(questionResult)}`}
        </Text>
      ) : (
        ''
      )}
      <Text style={styles.extraInformation}>
        Svar avgitt: {questionResult.common.answerValues.join(', ')}
      </Text>
    </View>
  );
};

export default ResultsDocumentQuestion;
