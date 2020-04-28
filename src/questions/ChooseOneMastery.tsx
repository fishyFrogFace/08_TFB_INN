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
  correctAlternative: string;
  updateResult: (result: QuestionResult) => void;
  skipQuestion: () => void;
}

const ChooseOne: React.FC<Props> = props => {
  const [selectedButton, setSelectedButton] = useState<number>();

  const checkAnswer = () => {
    if (selectedButton) {
      const selectedString = props.answerValues[selectedButton];
      return selectedString === props.correctAlternative ? 1 : 0;
    } else {
      return 0;
    }
  };

  const returnResult = () => {
    setSelectedButton(undefined);
    props.updateResult({
      mastered: true,
      answerValues: [],
      type: QuestionResultType.Mastery,
      maxPoints: props.correctAlternative.length,
      resultTitle: props.resultTitle,
      questionTitle: props.text,
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
