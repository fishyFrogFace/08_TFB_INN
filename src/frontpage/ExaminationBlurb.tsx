import React from 'react';
import './ExaminationBlurb.css';

export interface ExamInfo {
  id: number;
  title: string;
  description: string;
  imageFilename: string;
}

interface Props {
  examInfo: ExamInfo;
  chooseExamination: (ExamID: number) => void;
}

const ExaminationBlurb: React.FC<Props> = props => {
  return (
    <div className="examination-blurb">
      <div className="blurb-headline">
        <img /* Display picture for the examination. */
          src={props.examInfo.imageFilename !== "" // If there is a filename:
          ? "./media/" + props.examInfo.imageFilename // Load that image
          : ""}/> {/* Otherwise load nothing */}
        <div className="blurb-title">
          <h1>{props.examInfo.title}</h1>
        </div>
      </div>
      <p className="blurb-description">{props.examInfo.description}</p>
      <button onClick={() => props.chooseExamination(props.examInfo.id)}>Start</button>
    </div>
  );
};

export default ExaminationBlurb;