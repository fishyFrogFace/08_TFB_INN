import React from 'react';
import '../App.css';
import './FrontPage.css';
import ExaminationList from './ExaminationList';
import { ExamInfo } from './ExaminationBlurb';

interface Props {
  availableExaminations: ExamInfo[];
}

const FrontPage: React.FC<Props> = props => {
  return (
    <div className='main'>
      <div className='question-container'>
        <ExaminationList examInfos={props.availableExaminations} />
      </div>
    </div>
  );
};

export default FrontPage;
