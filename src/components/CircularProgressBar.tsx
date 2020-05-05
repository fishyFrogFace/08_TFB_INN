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
    <div className='progress-circle-container'>
      <span>{calculatePercentage()}%</span>
      <img
        className='progress-background'
        src={`percentages/${calculatePercentage()}.svg`}
      />
    </div>
  );
};

export default ProgressBar;
