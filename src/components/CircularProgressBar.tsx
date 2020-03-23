import React from 'react';
import './CircularProgressBar.css';
import { QuestionResult } from '../Types';

const ProgressBar: React.FC<{}> = props => {
  // const calculatePercentage = () => {
  //   return (props.pointsAchieved / props.maxPoints) * 100;
  // };

  return (
    <div className='progress-circle p10'>
      <span>10%</span>
      <div className='left-half-clipper'>
        <div className='first50-bar'></div>
        <div className='value-bar'></div>
      </div>
    </div>
  );
};

export default ProgressBar;
