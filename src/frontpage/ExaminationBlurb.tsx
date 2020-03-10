import React from 'react';
import './ExaminationBlurb.css';

export interface ExamInfo {
  examID: number;
  templateID: number;
  title: string;
  description: string;
  imageFilename: string;
}

interface Props {
  examInfo: ExamInfo;
  chooseExamination: (examID: number, templateID: number) => void;
}

const ExaminationBlurb: React.FC<Props> = props => {
  const blurbHeadline = () => {
    /* if image name is not an empty string, then render the image,
      if no image exists, render a headline without an image */
    if (props.examInfo.imageFilename !== '') {
      return (
        <div className='blurb-headline has-image'>
          <div className='img-container'>
            <img src={'./media/' + props.examInfo.imageFilename} />
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
        </div>
      );
    }
  };

  const pausedClass = () => {
    return props.examInfo.examID === 0 ? '' : 'paused-blurb';
  };

  const buttonText = () => {
    return props.examInfo.examID === 0 ? 'Start' : 'Fortsett';
  };

  return (
    <div className={`examination-blurb ${pausedClass()}`}>
      {blurbHeadline()}
      <p className='blurb-description'>{props.examInfo.description}</p>
      <button
        className='examination-startbutton'
        onClick={() =>
          props.chooseExamination(
            props.examInfo.examID,
            props.examInfo.templateID
          )
        }>
        {buttonText()}
      </button>
    </div>
  );
};

export default ExaminationBlurb;
