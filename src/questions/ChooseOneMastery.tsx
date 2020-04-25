import React, { useState } from 'react';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';

interface Props {
  text: string;
  resultTitle: string;
  isImage: boolean;
  answerValues: string[];
  correctAlt: string;
  updateResult: (result: QuestionResult) => void;
}

const ChooseOne: React.FC<Props> = props => {
  const [selectedButton, setSelectedButton] = useState<number>();

  const checkAnswer = () => {
    if (selectedButton) {
      const selectedString = props.answerValues[selectedButton];
      return selectedString === props.correctAlt ? 1 : 0;
    } else {
      return 0;
    }
  };

  const returnResult = () => {
    props.updateResult({
      mastered: true,
      answerValues: [],
      type: QuestionResultType.Mastery,
      maxPoints: props.correctAlt.length,
      resultTitle: props.resultTitle,
      pointsAchieved: checkAnswer()
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
