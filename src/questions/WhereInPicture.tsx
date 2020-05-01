import React, { useState } from 'react';
import './Question.css';
import { QuestionResult, ImageInformation } from '../Types';
import FlowButtons from 'components/FlowButtons';
import { makePointResult, failPointResult } from 'helpers/makeResult';

interface Props {
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
    <div>
      <h1 className='h1'>{props.text}</h1>
      <div>
        <img
          className={`where-in-picture-img ${mode}-image`}
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
      <FlowButtons
        skip={failQuestion}
        update={() => {
          if (mode !== 'incorrect') returnResult();
        }}
      />
    </div>
  );
};

export default WhereInPicture;
