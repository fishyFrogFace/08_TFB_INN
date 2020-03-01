import React, { useState } from 'react';
import '../App.css';
import Button from '../components/Button';
import { QuestionResult } from '../App'

interface Props {
  measures: string;
  maxPoints: number;
  getResult: (qResult: QuestionResult) => void;
}

const Start: React.FC<Props> = props => {
  return (
    <Button
      classNames='start'
      onClick={() =>
        props.getResult({
          measures: props.measures,
          maxPoints: props.maxPoints,
          pointsAchieved: props.maxPoints
        })
      }>
      Start
    </Button>
  );
};

export default Start;
