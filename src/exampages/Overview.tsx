import React from 'react';
import '../App.css';
import './Pages.css';
import Button from '../components/Button';
import CircularProgressBar from '../components/CircularProgressBar';

export interface SubjectCompletion {
  title: string;
  completed: number;
  total: number;
}

interface Props {
  subjects: SubjectCompletion[];
  currentSubject: string;
  startExam: () => void;
}

const Overview: React.FC<Props> = props => {
  return (
    <div className='questionContainer'>
      <h1 className='h1 overview-header'>Mine temaer</h1>
      <div className='subjectContainer'>
        {props.subjects.map((subject, i) => {
          return (
            <Button
              key={i}
              classNames='subject-btn'
              onClick={props.startExam}
              disabled={props.currentSubject !== subject.title}>
              <h2 className='subjectTitle'>{subject.title}</h2>
              <CircularProgressBar
                completed={subject.completed}
                total={subject.total}
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
