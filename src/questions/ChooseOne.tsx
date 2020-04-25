import React, { useState } from 'react';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';

interface Props {
  text: string;
  resultTitle: string;
  isImage: boolean;
  answerValues: string[];
  updateResult: (result: QuestionResult) => void;
}

const ChooseOne: React.FC<Props> = props => {
  const [selectedButton, setSelectedButton] = useState<number>();

  const returnResult = () => {
    props.updateResult({
      mastered: false,
      answerValues:
        selectedButton === undefined
          ? []
          : [props.answerValues[selectedButton!]],
      type: QuestionResultType.Other,
      maxPoints: 0,
      resultTitle: props.resultTitle,
      pointsAchieved: 0
    });
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
      <div>
        <Button classNames='next' onClick={returnResult}>
          Neste
        </Button>
      </div>
    </div>
  );
};

export default ChooseOne;
