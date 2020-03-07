import React, { useState } from 'react';
import '../App.css';
import './FrontPage.css';
import ExaminationList from './ExaminationList';
<<<<<<< HEAD
import { ExamInfo } from "./ExaminationBlurb";
=======
import NavBar from '../components/NavBar';
import { ExamInfo } from './ExaminationBlurb';
>>>>>>> 59f234df958c7ef2d85f7ed0cb9c0557220733a4

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
