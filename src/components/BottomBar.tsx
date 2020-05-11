import React from 'react';
import './Bar.css';
import { SubjectResult } from 'Types';

interface Props {
  subjectResult: SubjectResult;
}

const BottomBar: React.FC<Props> = props => {
  return (
    <div className='bottom-bar'>
      <div className='subject-name-container'>
        <p className='subject-name h2 black navbar-subject'>Placeholder</p>
      </div>
    </div>
  );
};

export default BottomBar;
