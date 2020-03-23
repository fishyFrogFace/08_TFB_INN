import React from 'react';
import '../App.css';
import './Pages.css';
import Button from '../components/Button';
import CircularProgressBar from '../components/CircularProgressBar';
import avatar from './big-pink.png';

interface Props {
  subjectTitles: string[];
  startExam: () => void;
}

const Overview: React.FC<Props> = props => {
  return (
    <div className='questionContainer'>
      <h1 className='h1 overview-header'>Mine temaer</h1>
      <div className='subjectContainer'>
        {props.subjectTitles.map(subjectTitle => {
          return (
            <Button classNames='subject-btn' onClick={props.startExam}>
              <h2 className='subjectTitle'>{subjectTitle}</h2>
              <CircularProgressBar />
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
