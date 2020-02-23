import React from 'react';
import './ProgressBar.css'
import { Result } from '../examination/Examination'

const ProgressBar: React.FC<Result> = props => {

  const calculatePercentage = () => {
    return props.pointsAchieved / props.maxPoints * 100
  }

  return (
    <div className='results'>
      <p>{props.measures}</p>
      <div className="progress-bar">
        <Filler percentage={calculatePercentage()} />
      </div>
    </div >
  );
}

interface FillerProps {
  percentage: number;
}

const Filler: React.FC<FillerProps> = props => {
  return <div className="filler" style={{ width: `${props.percentage}%` }} />;
}

export default ProgressBar;
