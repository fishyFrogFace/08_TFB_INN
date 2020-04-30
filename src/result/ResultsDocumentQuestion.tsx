import React from 'react';
import { StyleSheet, View, Text, Image } from '@react-pdf/renderer';
import {QuestionResult, QuestionResultType } from 'Types';

// Create styles
const styles = StyleSheet.create({
  question: {
    margin: 2,
  },
  symbol: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  lineWithImages: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 18,
  },
  extraInformation: {
    fontSize: 16,
    marginLeft: 48,
  }
});

export interface Props {
  questionResult: QuestionResult;
}

const getSymbolPath = (isMastery: boolean, mastered: boolean) => {
  if (isMastery) {
    if (mastered) {
      return "symbols/checkmark.png";
    } else {
      return "symbols/cross.png";
    }
  } else {
    return "symbols/circle.png";
  }
}

const ResultsDocumentQuestion: React.FC<Props> = ({ questionResult }) => {
  const isMastery = questionResult.type === QuestionResultType.Mastery;
  const mastered = questionResult.mastered;

  return (
    <View style={styles.question}>
      <View style={styles.lineWithImages}>
        <Image style={styles.symbol} src={getSymbolPath(isMastery, mastered)}></Image>
        <Text style={styles.title}>{isMastery ? questionResult.resultTitle : questionResult.questionTitle}</Text>
      </View>
      <Text style={styles.extraInformation}>{isMastery ? "Spørsmål: " + questionResult.questionTitle : ""}</Text>
      <Text style={styles.extraInformation}>Svar avgitt: {questionResult.answerValues.join(", ")}</Text>
    </View>)
};

export default ResultsDocumentQuestion