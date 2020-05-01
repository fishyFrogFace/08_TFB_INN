import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignContent: 'space-between',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 5
  },
  titleItem: {
    flex: 1
  },
  title: {
    fontSize: 36
  }
});

export interface Props {
  title: string;
  name: string;
  date: Date;
}

const getDateString = (date: Date) => {
  return (
    date.getFullYear().toString() +
    '/' +
    date.getMonth().toString() +
    '/' +
    date.getDate().toString()
  );
};

const ResultsDocumentTitle: React.FC<Props> = ({ title, name, date }) => (
  <View style={styles.titleContainer}>
    <View style={[styles.titleItem, styles.title]}>
      <Text>{title}</Text>
    </View>
    <View style={styles.titleItem}>
      <Text style={{ textAlign: 'right' }}>Navn: {name}</Text>
      <Text style={{ textAlign: 'right' }}>Dato: {getDateString(date)}</Text>
    </View>
  </View>
);

export default ResultsDocumentTitle;
