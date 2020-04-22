import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';

interface Props {
  text: string; //hva det blir spurt om
  maxPoints: number; //1
  resultTitle: string; //kartleggingsmål
  isImage: boolean;
  answerValues: string[]; //eksternt ?
  correctAlt: string; //riktig alternativ
  updateResult: (result: QuestionResult) => void; //??
}

const MultipleButtons: React.FC<Props> = props => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const updateAnswer = (value: number) => {
    if (selectedButtons.find(element => element === value) === undefined) {
      setSelectedButtons(selectedButtons.concat([value]));
    } else {
      setSelectedButtons(selectedButtons.filter(element => element !== value));
    }
    console.log(value);
  };

  const returnResult = () => {
    props.updateResult({
      mastered: true,
      answerValues: [],
      type: QuestionResultType.Mastery,
      maxPoints: props.maxPoints,
      resultTitle: props.resultTitle,
      pointsAchieved: 0 //TODO Fikses senere
    });
  };

  return (
    <div>
      <h1 className='h1'>{props.text}</h1>
      <div className='buttoncontainer'>
        {props.answerValues.map((item, i) => (
          <Button
            key={i}
            classNames={selectedButtons.includes(i) ? 'selected' : ''}
            onClick={() => updateAnswer(i)}>
            {props.isImage ? <img src={item} alt='' /> : item}
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

export default MultipleButtons;
