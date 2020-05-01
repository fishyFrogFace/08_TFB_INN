import React, { useState } from 'react';
import './Question.css';
import { QuestionResult, ImageInformation, QuestionResultType } from '../Types';
import FlowButtons from 'components/FlowButtons';

interface Props {
  subjectColor: string;
  maxPoints: number;
  text: string;
  resultTitle: string;
  imageInformation: ImageInformation;
  updateResult: (result: QuestionResult) => void;
  skipQuestion: () => void;
}

const WhereInPicture: React.FC<Props> = props => {
  const [points, setPoints] = useState(props.maxPoints);
  const [mode, setMode] = useState('incorrect');

  const checkInput = (x, y) => {
    const xInArea =
      x >= props.imageInformation.min.x && x <= props.imageInformation.max.x;
    const yInArea =
      y >= props.imageInformation.min.y && y <= props.imageInformation.max.y;
    if (xInArea && yInArea) {
      setMode('correct');
    } else {
      const newPoints = points > 0 ? points - 1 : 0;
      setPoints(newPoints);
    }
  };

  const resetLocalState = () => {
    setPoints(props.maxPoints);
    setMode('incorrect');
  };

  const onNext = () => {
    resetLocalState();
    if (mode !== 'incorrect') {
      props.updateResult({
        type: QuestionResultType.Mastery,
        maxPoints: props.maxPoints,
        resultTitle: props.resultTitle,
        pointsAchieved: points,
        mastered: true,
        answerValues: []
      });
    } else {
      props.updateResult({
        type: QuestionResultType.Mastery,
        maxPoints: props.maxPoints,
        resultTitle: props.resultTitle,
        pointsAchieved: 0,
        mastered: false,
        answerValues: []
      });
    }
  };

  return (
    <div className='content'>
      <div className={`questiontextContainer ${props.subjectColor}`}>
        <p className={`h2 white normal-font`}>{props.text}</p>
      </div>
      <div>
        <img
          className={`where-in-picture-img ${mode}-image whiteBackground`}
          onClick={e => {
            const xPos = e.pageX - e.currentTarget.offsetLeft;
            const yPos = e.pageY - e.currentTarget.offsetTop;
            checkInput(xPos, yPos);
          }}
          src={
            mode === 'incorrect'
              ? props.imageInformation.image
              : props.imageInformation.imageWithIndicator
          }
          alt={props.text}
        />
      </div>
      <div className='nextButtonContainer'>
        <FlowButtons
          skip={() => {
            resetLocalState();
            props.skipQuestion();
          }}
          update={onNext}
        />
      </div>
    </div>
  );
};

export default WhereInPicture;
