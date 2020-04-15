import React from 'react';
import '../App.css';
import './FrontPage.css';
import ExaminationList from './ExaminationList';

const FrontPage: React.FC<{}> = () => {
  return (
    <div className='main'>
      <div className='questionContainer'>
        <ExaminationList/>
      </div>
    </div>
  );
};

export default FrontPage;