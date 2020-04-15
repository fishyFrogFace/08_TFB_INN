import React from 'react';
import './ExaminationBlurb.css';
import { ExamInfo } from '../Types';

// PROBABLY NEEDS UPDATING, IT IS NOT VERY MUCH IN LINE WITH OUR CURRENT APPLICATION DESIGN

interface Props {
  examInfo: ExamInfo;
  chooseExamination: (instanceID: number) => void;
}

const ExaminationBlurb: React.FC<Props> = ({examInfo, chooseExamination}) => {
  const blurbHeadline = () => {
    /* if image name is not an empty string, then render the image,
      if no image exists, render a headline without an image */
    if (examInfo.imageFilename !== '') {
      return (
        <div className='blurb-headline has-image'>
          <div className='img-container'>
            <img src={`./media/${examInfo.imageFilename}`} alt='Avatar' />
          </div>
          <div className='blurb-title'>
            <h1>{examInfo.title}</h1>
          </div>
        </div>
      );
    } else {
      return (
        <div className='blurb-headline'>
          <div className='blurb-title'>
            <h1>{examInfo.title}</h1>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={'examination-blurb'}>
      {blurbHeadline()}
      <p className='blurb-description'>{examInfo.description}</p>
      <button
        className='examination-startbutton'
        onClick={() => chooseExamination(examInfo.instanceID)}>
        Start
      </button>
    </div>
  );
};

export default ExaminationBlurb;
