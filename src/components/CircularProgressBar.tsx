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

  const decideClassName = (percent: number) =>
    percent > 50 ? `over50 p${percent}` : `p${percent}`;

  return (
    <div>
      <div
        className={`progress-circle ${decideClassName(calculatePercentage())}`}>
        <span>{calculatePercentage()}%</span>
        <div className='left-half-clipper'>
          <div className='first50-bar'></div>
          <div className='value-bar'></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
