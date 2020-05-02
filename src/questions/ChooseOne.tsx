import React, { useState } from 'react';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';
import FlowButtons from 'components/FlowButtons';

interface Props {
  subjectColor: string;
  text: string;
  resultTitle: string;
  illustration?: string;
  isImage: boolean;
  answerValues: string[];
  updateResult: (result: QuestionResult) => void;
  skipQuestion: () => void;
}

const ChooseOne: React.FC<Props> = props => {
  const [selectedButton, setSelectedButton] = useState<number>();

  const returnResult = (result: number | undefined) => {
    setSelectedButton(undefined);
    if (result === undefined) {
      props.updateResult({
        mastered: false,
        answerValues: ['Jeg får ikke dette til'],
        type: QuestionResultType.Other,
        maxPoints: 0,
        resultTitle: props.resultTitle,
        questionTitle: props.text,
        pointsAchieved: 0
      });
    } else {
      props.updateResult({
        mastered: false,
        answerValues: [props.answerValues[result!]],
        type: QuestionResultType.Other,
        maxPoints: 0,
        resultTitle: props.resultTitle,
        questionTitle: props.text,
        pointsAchieved: 0
      });
    }
  };

  return (
    <div className='content'>
      <div className={`questiontextContainer ${props.subjectColor}`}>
        <p className='h2 white normal-font'>{props.text}</p>
      </div>

      <div className='multiple-button-container whiteBackground'>
        {props.illustration === undefined ? (
          ''
        ) : (
          <div className='questionImgContainer'>
            <img src={props.illustration} alt={'Illustration'} />
          </div>
        )}
        <div>
          {props.answerValues.map((item, i) => (
            <Button
              key={i}
              classNames={`answer-btn multibtn btn ${
                selectedButton === i ? 'selected' : ''
              }`}
              onClick={() => setSelectedButton(i)}>
              {props.isImage ? <img src={item} alt={`Button ${i}`} /> : item}
            </Button>
          ))}
        </div>
      </div>
      <FlowButtons
        skip={() => {
          returnResult(undefined);
        }}
        update={() => {
          if (selectedButton !== undefined) returnResult(selectedButton);
        }}
      />
    </div>
  );
};

export default ChooseOne;
