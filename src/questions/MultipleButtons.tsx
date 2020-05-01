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
  correctAlternativeList: string[];
  updateResult: (result: QuestionResult) => void;
  skipQuestion: () => void;
}

// component only works if there is a correct answer and should be remade
// or adjusted for non-mastery questions
// it is also not working well with pictures (CSS related)

const MultipleButtons: React.FC<Props> = props => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const updateAnswer = (value: number) => {
    if (selectedButtons.find(element => element === value) === undefined) {
      setSelectedButtons(selectedButtons.concat([value]));
    } else {
      setSelectedButtons(selectedButtons.filter(element => element !== value));
    }
  };

  const checkAnswer = () => {
    const selectedStrings = selectedButtons.map(i => props.answerValues[i]);
    const correctAnswers = props.correctAlternativeList.filter(alt =>
      selectedStrings.includes(alt)
    );

    const wrongAnswers = selectedStrings.length - correctAnswers.length;
    const finalPoints = correctAnswers.length - wrongAnswers;

    return finalPoints >= 0 ? finalPoints : 0;
  };

  const returnResult = () => {
    setSelectedButtons([]);
    props.updateResult({
      mastered: true,
      answerValues: [],
      type: QuestionResultType.Mastery,
      maxPoints: props.correctAlternativeList.length,
      resultTitle: props.resultTitle,
      pointsAchieved: checkAnswer()
    });
  };

  return (
    <div className='content'>
      
      {props.illustration === undefined ? (
        <div className={`questiontextContainer ${props.subjectColor}`}>
          <p className='h2 white normal-font'>{props.text} (flere valg mulig)</p>
        </div>
        
      ) : (
        <div>
        <div className="questiontextContainer bluegrey-background">
            <h1 className='h1'>{props.text} (flere valg mulig)</h1>
          </div>

          <div className="questionImgContainer">
            <img src={props.illustration} alt={'Illustration'} />
            </div>
        </div>
      )}
      <div className='multiple-button-container whiteBackground' >
        {props.answerValues.map((item, i) => (
          <Button
            key={i}
            classNames={`answer-btn multibtn btn ${
              selectedButtons.includes(i) ? 'selected' : ''
            }`}
            onClick={() => updateAnswer(i)}>
            {props.isImage ? <img src={item} alt={`Button ${i}`} /> : item}
          </Button>
        ))}
      </div>
      <FlowButtons
        skip={() => {
          setSelectedButtons([]);
          props.skipQuestion();
        }}
        update={returnResult}
      />
    </div>
  );
};

export default MultipleButtons;
