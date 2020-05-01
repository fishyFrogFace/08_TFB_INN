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
          setSelectedButton(undefined);
          props.skipQuestion();
        }}
        update={returnResult}
      />
    </div>
  );
};

export default ChooseOne;
