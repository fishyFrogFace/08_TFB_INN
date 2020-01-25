import React from 'react';
import '../App.css';
import { Page } from '../App'

interface Props {
    changePage: (page: Page) => void
}

const BackNext: React.FC<Props> = props => {
  return (
    <div className='Main'>
        <button className='Index-button'>
          Next
        </button>
    </div>
  );
}

export default BackNext;