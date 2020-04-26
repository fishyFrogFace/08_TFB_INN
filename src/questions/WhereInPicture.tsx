import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, ImageInformation, QuestionResultType } from '../Types';

interface Props {
  maxPoints: number;
  text: string;
  resultTitle: string;
  imageInformation: ImageInformation;
  updateResult: (result: QuestionResult) => void;
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

  const onNext = () => {
    setPoints(props.maxPoints);
    setMode('incorrect');
    props.updateResult({
      type: QuestionResultType.Mastery,
      maxPoints: props.maxPoints,
      resultTitle: props.resultTitle,
      pointsAchieved: points,
      mastered: true,
      answerValues: []
    });
  };

  // onClick might not work on touch screens, but is harder to test in development
  // due to the application not being live. will test in production branch
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

      <Button classNames={`next ${mode}`} onClick={() => onNext()}>
        Neste
      </Button>
    </div>
  );
};

export default WhereInPicture;
