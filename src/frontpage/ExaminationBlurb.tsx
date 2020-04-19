import React from 'react';
import './ExaminationBlurb.css';
import { updateAppPage } from 'redux/actions';
import { connectDispatch } from 'redux/util';
import { Page } from 'Types';

export interface ExamInfo {
  instanceID: number;
  title: string;
  description: string;
  imageFilename: string;
}

interface Props extends PropsFromRedux {
  examInfo: ExamInfo;
}

const ExaminationBlurb: React.FC<Props> = props => {
  const blurbHeadline = () => {
    /* if image name is not an empty string, then render the image,
      if no image exists, render a headline without an image */
    if (props.examInfo.imageFilename !== '') {
      return (
        <div className='blurb-headline has-image'>
          <div className='img-container'>
            <img src={`./media/${props.examInfo.imageFilename}`} alt='Avatar' />
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

  return (
    <div className={'examination-blurb'}>
      {blurbHeadline()}
      <p className='blurb-description'>{props.examInfo.description}</p>
      <button
        className='examination-startbutton'
        onClick={() => props.updateAppPage(Page.Examination)}>
        Start
      </button>
    </div>
  );
};

// Redux related:

const mapToDispatch = {
  updateAppPage
};

type PropsFromRedux = typeof mapToDispatch;

const connector = connectDispatch(mapToDispatch);

export default connector(ExaminationBlurb);
