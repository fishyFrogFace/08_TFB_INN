import React from 'react';
import { StyleSheet, View, Text, Image } from '@react-pdf/renderer';
import {QuestionResult, QuestionResultType } from 'Types';

// Create styles
const styles = StyleSheet.create({
  userInfo: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 10,
  },
  title: {
    fontSize: 24,
  },
  extraInformation: {
    fontSize: 18,
    marginLeft: 24,
  }
});

export interface Props {
  devices: string;
}

const ResultsDocumentUserInfo: React.FC<Props> = ({ devices }) => {
  return (
    <View style={styles.userInfo}>
      <Text style={styles.title}>Om brukeren</Text>
      <Text style={styles.extraInformation}>Har følgende enheter: {devices}</Text>
    </View>)
};

export default ResultsDocumentUserInfo