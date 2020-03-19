import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, Question } from '../Types';

interface Props {
  text: string; //hva det blir spurt om
  maxPoints: number; //1
  measures: string; //kartleggingsmål
  answerValues: Array<string>; //eksternt ?
  correctAlt: string; //riktig alternativ

  getResult: (result: QuestionResult) => void; //??
}
/*
props: string title
func create question (content, correctAns, ) eksternt
  createseveralbuttons([a,b,c,d], b)
  func: set riktig alternativ [b] - riktig svar
array: content for buttons (eksternt) [a, b, c, d] 

func: velg et alternativ (internt)
func: sjekk om det er riktig alternativ (internt)

chosenButton = 0
onClick: chosen button = this.

*/


const SeveralButton: React.FC<Props> = props => {
  const [input, setInput] = useState('');
  const [points, setPoints] = useState(props.maxPoints);



  const updateAnswer = (value: string) => {
    setInput(value);
    console.log(value); 
  }
  
  const returnResult = () => {
    props.getResult({
      maxPoints: props.maxPoints,
      measures: props.measures,
      pointsAchieved: (input == props.correctAlt ? 1 : 0)
    })
  }
 
  


  return (
    <div>
      <h1 className='h1'>{props.text}</h1>
      <h2>{input}</h2>
      <div className="buttoncontainer">
        
          {props.answerValues.map((item, i) =>
              <Button key={i} classNames='next' onClick={() => updateAnswer(item)}>
                {item}
              </Button>
          )}
        
      </div>
      <div>
        <Button classNames='next' onClick={returnResult}>
          Neste
        </Button>
      </div>

    </div>
  );
};

export default SeveralButton;
