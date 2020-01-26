import React from 'react';
import '../App.css';
import { Page } from '../App'

interface Props {
    changePage: (page: Page) => void
}

const Start: React.FC<Props> = props => {
  return (
    <div className='main'>
        <button className='index-button btn' onClick={() => props.changePage(Page.Next)}>
          Start
        </button>
    </div>
  );
}

export default Start;