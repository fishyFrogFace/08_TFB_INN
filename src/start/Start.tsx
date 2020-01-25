import React from 'react';
import '../App.css';
import { Page } from '../App'

interface Props {
    changePage: (page: Page) => void
}

const Start: React.FC<Props> = props => {
  return (
    <div className='Main'>
        <button className='Index-button' onClick={() => props.changePage(Page.BackNext)}>
          Start
        </button>
    </div>
  );
}

export default Start;