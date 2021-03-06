import React from 'react';
import { StyleSheet, View, Text, Image } from '@react-pdf/renderer';
import { QuestionResult, Points } from 'Types';

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

const getSymbolPath = (questionResult: Points) => {
  switch (questionResult.pointsAchieved / questionResult.maxPoints) {
    case 0:
      return <Image style={styles.symbol} src={'symbols/percentage-red.png'} />;
    case 1:
      return (
        <Image style={styles.symbol} src={'symbols/percentage-green.png'} />
      );
    default:
      return (
        <Image style={styles.symbol} src={'symbols/percentage-yellow.png'} />
      );
  }
};

const pointsAchieved = (questionResult: Points) =>
  `${Math.round(100 * questionResult.pointsAchieved / questionResult.maxPoints)}%`;

const questionResultView = (questionResult: QuestionResult) => {
  switch (questionResult.type) {
    case 'mastery':
      return (
        <View style={styles.question}>
          <View style={styles.lineWithImages}>
            <Image
              style={styles.symbol}
              src={
                questionResult.mastered
                  ? 'symbols/checkmark.png'
                  : 'symbols/cross.png'
              }
            />
            <Text style={styles.title}>
              {questionResult.common.resultTitle}
            </Text>
          </View>
          <Text style={styles.extraInformation}>
            Spørsmål: {questionResult.common.questionTitle}
          </Text>
          <Text style={styles.extraInformation}>
            Svar avgitt: {questionResult.common.answerValues.join(', ')}
          </Text>
          <Text style={styles.extraInformation}>
            Poeng oppnådd: {questionResult.mastered ? "100%" : "0%"}
          </Text>
        </View>
      );

    case 'points':
      return (
        <View style={styles.question}>
          <View style={styles.lineWithImages}>
            {getSymbolPath(questionResult)}
            <Text style={styles.title}>
              {questionResult.common.resultTitle}
            </Text>
          </View>
          <Text style={styles.extraInformation}>
            Spørsmål: {questionResult.common.questionTitle}
          </Text>
          <Text style={styles.extraInformation}>
            Poeng oppnådd: {pointsAchieved(questionResult)}
          </Text>
          <Text style={styles.extraInformation}>
            Svar avgitt: {questionResult.common.answerValues.join(', ')}
          </Text>
        </View>
      );

    default:
      return (
        <View style={styles.question}>
          <View style={styles.lineWithImages}>
            <Image style={styles.symbol} src='symbols/circle.png' />
            <Text style={styles.title}>
              {questionResult.common.questionTitle}
            </Text>
          </View>
          <Text style={styles.extraInformation}>
            Svar avgitt: {questionResult.common.answerValues.join(', ')}
          </Text>
        </View>
      );
  }
};

const ResultsDocumentQuestion: React.FC<Props> = ({ questionResult }) => {
  return questionResultView(questionResult);
};

export default ResultsDocumentQuestion;
