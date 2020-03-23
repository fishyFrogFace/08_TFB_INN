import React, { useState } from 'react';
import '../App.css';
import './Pages.css';
import Button from '../components/Button';
import CircularProgressBar from '../components/CircularProgressBar';
import avatar from './big-pink.png';

interface Props {
  startExam: () => void
}

const Overview: React.FC<Props> = props => {
  return (
    <div className='questionContainer'>
      <CircularProgressBar />
      <Button classNames='next' onClick={() => props.startExam()}>
        Neste
      </Button>
    </div>
  );
};

export default Overview;
