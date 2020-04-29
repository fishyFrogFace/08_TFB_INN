import React, { useState } from 'react';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';
import FlowButtons from 'components/FlowButtons';

interface Props {
  text: string;
  resultTitle: string;
  isImage: boolean;
  answerValues: string[];
  updateResult: (result: QuestionResult) => void;
  skipQuestion: () => void;
}

const ChooseOne: React.FC<Props> = props => {
  const [selectedButton, setSelectedButton] = useState<number>();

  const returnResult = () => {
    setSelectedButton(undefined);
    if (selectedButton === undefined) {
      props.skipQuestion();
    } else {
      props.updateResult({
        mastered: false,
        answerValues: [props.answerValues[selectedButton!]],
        type: QuestionResultType.Other,
        maxPoints: 0, 
        resultTitle: props.resultTitle,
        pointsAchieved: 0
      });
    }
  };

  return (
    <div>
      <h1 className='h1'>{props.text}</h1>
      <div className='multiple-button-container'>
        {props.answerValues.map((item, i) => (
          <Button
            key={i}
            classNames={`answer-btn ${selectedButton === i ? 'selected' : ''}`}
            onClick={() => setSelectedButton(i)}>
            {props.isImage ? <img src={item} alt={`Button ${i}`} /> : item}
          </Button>
        ))}
      </div>
      <FlowButtons
        skip={() => {
          setSelectedButton(undefined);
          props.skipQuestion();
        }}
        update={returnResult}
      />
    </div>
  );
};

export default ChooseOne;
