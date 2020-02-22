import React, { useState } from "react";
import './Result.css';
import ProgressBar from "components/ProgressBar";

interface Result {
  measures: string,
  maxPoints: number,
  pointsAchieved: number
}

interface Props {
  results: Result[]
}

const Result: React.FC<Props> = props => {

  const [results] = useState(props.results);

  return (
    <div className='resultContainer'>
      {
        results.map(element => {
          return <ProgressBar measures={element.measures} maxPoints={element.maxPoints} pointsAchieved={element.pointsAchieved} />
        })
      }
    </div>
  );
}

export default Result;