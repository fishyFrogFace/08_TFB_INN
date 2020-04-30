import React, { useState } from 'react';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';
import FlowButtons from 'components/FlowButtons';

interface Props {
  text: string;
  resultTitle: string;
  illustration?: string;
  isImage: boolean;
  answerValues: string[];
  correctAlternative: string;
  updateResult: (result: QuestionResult) => void;
  skipQuestion: () => void;
}

const ChooseOne: React.FC<Props> = props => {
  const [selectedButton, setSelectedButton] = useState<number>();

  const checkAnswer = (result: number | undefined) => {
    if (result) {
      const selectedString = props.answerValues[result];
      return selectedString === props.correctAlternative ? 1 : 0;
    } else {
      return 0;
    }
  };

  const returnResult = (result: number | undefined) => {
    setSelectedButton(undefined);
    props.updateResult({
      mastered: checkAnswer(result) === 1,
      answerValues: [],
      type: QuestionResultType.Mastery,
      maxPoints: props.correctAlternative.length,
      resultTitle: props.resultTitle,
      pointsAchieved: checkAnswer(result)
    });
  };

  return (
    <div>
      {props.illustration === undefined ? (
        <h1 className='h1'>{props.text}</h1>
      ) : (
        <div>
          <h1 className='h1'>{props.text}</h1>
          <img src={props.illustration} alt={'Illustration'} />
        </div>
      )}
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
        skip={() => returnResult(undefined)}
        update={() => {if (selectedButton !== undefined) returnResult(selectedButton)}}
      />
    </div>
  );
};

export default ChooseOne;
