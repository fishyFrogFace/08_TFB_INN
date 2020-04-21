import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult } from '../Types';

interface Props {
  text: string; //spørsmålsteksten
  maxPoints: number; //1
  resultTitle: string; //kartleggingsmål
  correctAlt: Array<string>; //riktig(e) alternativ(er)
  answerValues: Array<string>; //internt, avgitt(e) svar

  updateResult: (result: QuestionResult) => void; //??
}

//kommentarer: prøver å legge rette for flere riktige alternativer og flere avgitte svar.

const SeveralButtons: React.FC<Props> = props => {
  const [input, setInput] = useState('');
  //const [input: string[], setInput] = useState(''); //vil signalisere at input kan være en array
  const [points, setPoints] = useState(props.maxPoints);

  //hvis det er flere riktige alternativer kan svar legges til og endres på. ellers oppdateres bare det vanlige svaret
  const updateAnswer = (value: string) => {
    /*if (correctAlt.length > 1) {
         answerValues.include(value) ? 
          answerValues.pop(value)
          :
          answerValues.push(value)
          }
      }
    */

    setInput(value);
    console.log(value);
  };

  //finner ut av hvor mange avgitte svar som matcher correctAlt (correct alternatives)

  /*
  const filterAnswer = (input: string[], correctAlt: string[]) => { 
      const correctAnswers : string[] = [];
      answerValues.map((i => correctAnswers.includes(i) ? correctAnswers.push(i) : ''));
      return correctAnswers.length;
        
    } 
  */

  const returnResult = () => {
    props.updateResult({
      maxPoints: props.maxPoints,
      resultTitle: props.resultTitle,
      pointsAchieved: props.correctAlt.includes(input) ? 1 : 0
      //pointsAchieved: (filterAnswer >= props.maxPoints ? 1 : 0)
      //answervalues: ...
    });
  };

  return (
    <div>
      <h1 className='h1'>{props.text}</h1>
      <h2>{input}</h2>
      <div className='buttoncontainer'>
        {props.answerValues.map((item, i) => (
          <Button key={i} classNames='next' onClick={() => updateAnswer(item)}>
            {item}
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

export default SeveralButtons;
