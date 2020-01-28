import React from 'react';
import '../App.css';
import { Page } from '../App'

interface Props {
    changePage: (page: Page) => void
}

const Next: React.FC<Props> = props => {
  return (
    <div className='outer'>
      <div className='imageContainer'>
        <img src={"penguin.svg"} alt="Penguin"/>
      </div>
      <div className='backnext'>
          <button className='btn' onClick={() => props.changePage(Page.Start)}>
            Back
          </button>
          <button className='btn' onClick={() => props.changePage(Page.Back)}>
            Next
          </button>
      </div>
    </div>
  );
}

export default Next;