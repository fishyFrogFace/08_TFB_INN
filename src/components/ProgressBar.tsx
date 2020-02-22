import React from "react";
import { Int } from '../Helpers'

interface Props {
  maxPoints: number,
  pointsAchieved: number
}

const ProgressBar: React.FC<Props> = props => {

  const calculatePercentage = () => {
    return props.pointsAchieved/props.maxPoints
  }

  return (
    <div className="progress-bar">
      <Filler percentage={ calculatePercentage() } />
    </div>
  );
}

interface FillerProps {
  percentage: number;
}

const Filler: React.FC<FillerProps> = props => {
  return <div className="filler" style={{ width: `${props.percentage}%` }} />;
}

export default ProgressBar;
