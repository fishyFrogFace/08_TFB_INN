import React, { useState } from 'react';
import '../App.css';
import './FrontPage.css';
import ExaminationList from './ExaminationList';
import { ExamInfo } from './ExaminationBlurb';

interface Props {
  availableExaminations: ExamInfo[];
  chooseExamination: (instanceID: number) => void;
}

const FrontPage: React.FC<Props> = props => {

  return (
    <div className='main'>
      <div className='questionContainer'>
        <ExaminationList
          examInfos={props.availableExaminations}
          chooseExamination={props.chooseExamination}
        />
      </div>
    </div>
  );
};

export default FrontPage;
