import React, { useState } from "react";
import '../App.css';
import NavBar from '../components/NavBar'
import ProgressBar from "components/ProgressBar";

interface Result {
  measures: String,
  maxPoints: number,
  pointsAchieved: number
}

interface Props {
  results: Result[]
}

const Result: React.FC<Props> = props => {

  const [results] = useState(props.results);

  return (
    <div className="main">
      <NavBar />
      <div className='questionContainer'>
        <div className='frontpage-buttons'>
          {
            results.map(element => {
              return <ProgressBar maxPoints={element.maxPoints} pointsAchieved={element.pointsAchieved} />
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Result;