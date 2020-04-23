import React, { useState } from 'react';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';

interface Props {
  text: string;
  maxPoints: number;
  resultTitle: string;
  isImage: boolean;
  answerValues: string[];
  correctAlt: string[];
  updateResult: (result: QuestionResult) => void;
}

const MultipleButtons: React.FC<Props> = props => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const updateAnswer = (value: number) => {
    if (selectedButtons.find(element => element === value) === undefined) {
      setSelectedButtons(selectedButtons.concat([value]));
    } else {
      setSelectedButtons(selectedButtons.filter(element => element !== value));
    }
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
      <div className='multiple-button-container'>
        {props.answerValues.map((item, i) => (
          <Button
            key={i}
            classNames={`answer-btn ${
              selectedButtons.includes(i) ? 'selected' : ''
            }`}
            onClick={() => updateAnswer(i)}>
            {props.isImage ? (
              <img src={item} alt={`Button image ${i}`} />
            ) : (
              item
            )}
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
