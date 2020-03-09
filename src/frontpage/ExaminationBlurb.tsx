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
  return (
    <div className='examination-blurb'>
      {props.examInfo.imageFilename !== '' ? (
        <div className='blurb-headline has-image'>
          <div className='img-container'>
            <img src={'./media/' + props.examInfo.imageFilename} />
          </div>
          <div className='blurb-title'>
            <h1>{props.examInfo.title}</h1>
          </div>
        </div>
      ) : (
        <div className='blurb-headline'>
          <div className='blurb-title'>
            <h1>{props.examInfo.title}</h1>
          </div>
        </div>
      )}
      <p className='blurb-description'>{props.examInfo.description}</p>
      <button
        className='examination-startbutton'
        onClick={() =>
          props.chooseExamination(
            props.examInfo.examID,
            props.examInfo.templateID
          )
        }>
        Start
      </button>
    </div>
  );
};

export default ExaminationBlurb;
