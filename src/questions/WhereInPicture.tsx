import React, { useState } from 'react';
import './Question.css';
import { QuestionResult, ImageInformation } from '../Types';
import FlowButtons from 'components/FlowButtons';
import { makePointResult, failPointResult } from 'helpers/makeResult';

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
  const [points, setPoints] = useState<number>(props.maxPoints);
  const [mode, setMode] = useState<string>('incorrect');

  const checkInput = (x, y) => {
    const positionList =
      window.innerWidth > 500
        ? props.imageInformation.largeScreen
        : props.imageInformation.smallScreen;
    const correct = positionList.filter(imageInfo => {
      const xInArea = x >= imageInfo.min.x && x <= imageInfo.max.x;
      const yInArea = y >= imageInfo.min.y && y <= imageInfo.max.y;
      return xInArea && yInArea;
    });

    if (correct.length > 0) {
      setMode('correct');
    } else {
      setMode('incorrect');
      const newPoints = points > 0 ? points - 1 : 0;
      setPoints(newPoints);
    }
  };

  const resetLocalState = () => {
    setPoints(props.maxPoints);
    setMode('incorrect');
  };

  const returnResult = () => {
    resetLocalState();
    props.updateResult(
      makePointResult(props, ['Valgte riktig område'], points)
    );
  };

  const failQuestion = () => {
    resetLocalState();
    props.updateResult(failPointResult(props));
  };

  return (
    <div className='content'>
      <div className={`question-text-container ${props.subjectColor}`}>
        <p className={`h2 white normal-font`}>{props.text}</p>
      </div>
      <div className='input-container white-background'>
        <img
          className={`where-in-picture-img ${
            mode === 'incorrect' ? 'incorrect-image' : 'hidden-image'
          }`}
          onClick={e => {
            const xPos =
              e.pageX -
              (e.currentTarget.getBoundingClientRect().left + window.scrollX);
            const yPos =
              e.pageY -
              (e.currentTarget.getBoundingClientRect().top + window.scrollY);
            console.log(xPos, yPos);
            checkInput(xPos, yPos);
          }}
          src={props.imageInformation.image}
          alt={props.text}
        />
        <img
          className={`where-in-picture-img ${
            mode === 'incorrect' ? 'hidden-image' : ''
          }`}
          src={props.imageInformation.imageWithIndicator}
          alt={props.text}
        />
      </div>
      <FlowButtons
        skip={failQuestion}
        update={() => {
          if (mode === 'correct') returnResult();
        }}
      />
    </div>
  );
};

export default WhereInPicture;
