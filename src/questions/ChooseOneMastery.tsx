import React, { useState } from 'react';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult } from '../Types';
import FlowButtons from 'components/FlowButtons';
import { makeMasteryResult, imageAnswer } from 'helpers/makeResult';

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

  const returnResult = (result: number) => {
    setSelectedButton(undefined);
    props.updateResult(
      makeMasteryResult(
        props,
        props.isImage
          ? [imageAnswer(props.answerValues[result])]
          : [props.answerValues[result]],
        props.answerValues[result] === props.correctAlternative
      )
    );
  };

  const failQuestion = () => {
    setSelectedButton(undefined);
    props.updateResult(
      makeMasteryResult(props, ['Jeg får ikke dette til'], false)
    );
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
