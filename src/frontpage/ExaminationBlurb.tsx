import React from 'react';
import './ExaminationBlurb.css';

interface ExamInfo {
  id: number;
  title: string;
  description: string;
}

interface Props {
  examInfo: ExamInfo;
  chooseExamination: (ExamID: number) => void;
}

const ExaminationBlurb: React.FC<Props> = props => {
  return (
    <div className="examination-info">
      <h1>{props.examInfo.title}</h1>
      <p>{props.examInfo.description}</p>
      <button onClick={() => props.chooseExamination(props.examInfo.id)}>Start</button>
    </div>
  );
};

export default ExaminationBlurb;