import React from 'react';
import ExaminationBlurb from './ExaminationBlurb';
import './ExaminationList.css';
import { ExamInfo } from './ExaminationBlurb';

interface Props {
  examInfos: ExamInfo[]; // Array of objects containing info on available examinations
}

const ExaminationList: React.FC<Props> = props => {
  return (
    <div className='examination-list'>
      {props.examInfos.map((examInfo, i) => {
        return <ExaminationBlurb key={i} examInfo={examInfo} />;
      })}
    </div>
  );
};

export default ExaminationList;
