import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, ImageInformation } from '../Types';

interface Props {
  maxPoints: number;
  text: string;
  resultTitle: string;
  imageInformation: ImageInformation;
  updateResult: (result: QuestionResult) => void;
}

const WhereInPicture: React.FC<Props> = props => {
  // set a randomly generated name that will be kept if user doesn't type anything
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [points, setPoints] = useState(props.maxPoints);
  const [clickedWhileCorrect, setClickedWhileCorrect] = useState(false);
  //for debugging
  const [foo, setFoo] = useState('false');
  const [bar, setBar] = useState('false');
  //for debugging

  const checkInput = (x, y) => {
    const xInArea =
      x >= props.imageInformation.min.x && x <= props.imageInformation.max.x;
    const yInArea =
      y >= props.imageInformation.min.y && y <= props.imageInformation.max.y;
    //for debugging
    const blah = p => (p ? 'true' : 'false');
    setFoo(blah(xInArea));
    setBar(blah(yInArea));
    //for debugging
    if (xInArea && yInArea) {
      // feedback to user
      setClickedWhileCorrect(true);
    } else {
      const newPoints = points > 0 ? points - 1 : 0;
      setPoints(newPoints);
      // feedback to user
    }
  };

  const onNext = () => {
    // disabled if not correct
    props.updateResult({
      maxPoints: props.maxPoints,
      resultTitle: props.resultTitle,
      pointsAchieved: points
    });
  };

  // onClick might not work on touch screens, but is harder to test in development
  // due to the application not being live. will test in production branch
  return (
    <div>
      <h1 className='h1'>{props.text}</h1>
      <form
        className='textAndBtn'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <img
          className='whereInPictureImg'
          onClick={e => {
            const xPos = e.pageX - e.currentTarget.offsetLeft;
            const yPos = e.pageY - e.currentTarget.offsetTop;
            //for debugging
            setPosition({
              x: e.pageX - e.currentTarget.offsetLeft,
              y: e.pageY - e.currentTarget.offsetTop
            });
            //for debugging
            checkInput(xPos, yPos);
          }}
          src={props.imageInformation.image}
          alt={props.text}
        />

        <p>
          X: {position.x}, Y: {position.y}
        </p>
        <p>
          {foo}, {bar}
        </p>

        <Button
          classNames='next'
          onClick={() => onNext()}
          disabled={!clickedWhileCorrect}>
          Neste
        </Button>
      </form>
    </div>
  );
};

export default WhereInPicture;
