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
      <h1 className='h1'>Resultat</h1>
      {
        results.map(element => {
          return <ProgressBar {...element} />
        })
      }
    </div>
  );
}

export default Result;