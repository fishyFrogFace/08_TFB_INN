import React, { useState } from 'react';
import '../App.css';
import './FrontPage.css';
import ExaminationList from './ExaminationList';
import NavBar from '../components/NavBar';

interface ExamInfo {
  id: number;
  title: string;
  description: string;
}

interface Examination {
  name: string;
  username: string;
  avatar: string; // should be an actual picture or link to picture
  status: string;
  id: number;
}

interface Props {
  availableExaminations: ExamInfo[];
  chooseExamination: (id: number) => void;
}

/* buttons should be generated from props passed to the component
   based on available examinations */
const FrontPage: React.FC<Props> = props => {
  return (
    <div className='main'>
      <NavBar />
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
