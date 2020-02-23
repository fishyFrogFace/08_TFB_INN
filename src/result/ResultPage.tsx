import React, { useState } from "react";
import './ResultPage.css';
import ProgressBar from 'components/ProgressBar';
import { Result } from '../examination/Examination'

interface Props {
  results: Result[]
}

const ResultPage: React.FC<Props> = props => {

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

export default ResultPage;