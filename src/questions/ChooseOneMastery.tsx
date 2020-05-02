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
  correctAlternative: string;
  updateResult: (result: QuestionResult) => void;
  skipQuestion: () => void;
}

const ChooseOne: React.FC<Props> = props => {
  const [selectedButton, setSelectedButton] = useState<number>();

  const checkAnswer = (result: number | undefined) => {
    if (result) {
      const selectedString = props.answerValues[result];
      return selectedString === props.correctAlternative ? 1 : 0;
    } else {
      return 0;
    }
  };

  const returnResult = (result: number | undefined) => {
    setSelectedButton(undefined);
    props.updateResult({
      mastered: checkAnswer(result) === 1,
      answerValues: [props.answerValues[result!]],
      type: QuestionResultType.Mastery,
      maxPoints: 1,
      resultTitle: props.resultTitle,
      questionTitle: props.text,
      pointsAchieved: checkAnswer(result)
    });
  };

  const failQuestion = () => {
    setSelectedButton(undefined);
    props.updateResult({
      type: QuestionResultType.Mastery,
      maxPoints: props.correctAlternative.length,
      resultTitle: props.resultTitle,
      questionTitle: props.text,
      pointsAchieved: 0,
      mastered: false,
      answerValues: ['Jeg får ikke dette til']
    });
  };

  return (
    <div className='content'>
      <div className={`questiontextContainer ${props.subjectColor}`}>
        <p className='h2 white normal-font'>{props.text}</p>
      </div>

      <div className='inputContainer whiteBackground'>
        {props.illustration === undefined ? (
          ''
        ) : (
          <div className='imageContainer'>
            <img
              className='illustrationImg'
              src={props.illustration}
              alt={'Illustration'}
            />
          </div>
        )}

        <div className='multiple-button-container'>
          {props.answerValues.map((item, i) => (
            <Button
              key={i}
              classNames={`multibtn answer-btn btn ${
                selectedButton === i ? 'selected' : ''
              }`}
              onClick={() => setSelectedButton(i)}>
              {props.isImage ? (
                <div className='imageContainer'>
                  <img
                    className='illustrationImg'
                    src={item}
                    alt={`Button ${i}`}
                  />
                </div>
              ) : (
                item
              )}
            </Button>
          ))}
        </div>
      </div>
      <div className='nextButtonContainer'>
        <FlowButtons
          skip={failQuestion}
          update={() => {
            if (selectedButton !== undefined) returnResult(selectedButton);
          }}
        />
      </div>
    </div>
  );
};

export default ChooseOne;
