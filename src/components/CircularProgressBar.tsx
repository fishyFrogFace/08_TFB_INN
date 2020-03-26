import React from 'react';
import './CircularProgressBar.css';

interface Props {
  completed: number;
  total: number;
}

const ProgressBar: React.FC<Props> = props => {
  const calculatePercentage = () => {
    return Math.round((props.completed / props.total) * 100);
  };

  return (
    <div className={`progress-circle p${calculatePercentage()}`}>
      <span>{calculatePercentage()}%</span>
      <div className='left-half-clipper'>
        <div className='first50-bar'></div>
        <div className='value-bar'></div>
      </div>
    </div>
  );
};

export default ProgressBar;
