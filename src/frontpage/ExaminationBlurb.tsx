import React from 'react';
import './ExaminationBlurb.css';
import deleteImg from '../components/exit.svg';

export interface ExamInfo {
  instanceID: number;
  title: string;
  description: string;
  imageFilename: string;
}

interface Props {
  examInfo: ExamInfo;
  chooseExamination: (instanceID: number) => void;
  requestDeletion: (instanceID: number) => void;
}

const ExaminationBlurb: React.FC<Props> = props => {
  const blurbHeadline = () => {
    /* if image name is not an empty string, then render the image,
      if no image exists, render a headline without an image */
    if (props.examInfo.imageFilename !== '') {
      return (
        <div className='blurb-headline has-image'>
          <div className='img-container'>
            <img
              src={`./media/${props.examInfo.imageFilename}`}
              alt='Avatar'
            />
          </div>
          <div className='blurb-title'>
            <h1>{props.examInfo.title}</h1>
          </div>
        </div>
      );
    } else {
      return (
        <div className='blurb-headline'>
          <div className='blurb-title'>
            <h1>{props.examInfo.title}</h1>
          </div>
          {props.examInfo.instanceID !== 0 ? (
            <img
              className='delete-button'
              src={deleteImg}
              alt='Delete'
              onClick={() => props.requestDeletion(props.examInfo.instanceID)}
            />
          ) : (
            ''
          )}
        </div>
      );
    }
  };

  const pausedClass = () => {
    return props.examInfo.instanceID === 0 ? '' : 'paused-blurb';
  };

  const buttonText = () => {
    return props.examInfo.instanceID === 0 ? 'Start' : 'Fortsett';
  };

  return (
    <div className={`examination-blurb ${pausedClass()}`}>
      {blurbHeadline()}
      <p className='blurb-description'>{props.examInfo.description}</p>
      <button
        className='examination-startbutton'
        onClick={() => props.chooseExamination(props.examInfo.instanceID)}>
        {buttonText()}
      </button>
    </div>
  );
};

export default ExaminationBlurb;
