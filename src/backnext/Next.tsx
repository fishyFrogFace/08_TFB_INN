import React from 'react';
import '../App.css';
import { Page } from '../App'
import NavBar from '../components/NavBar'

interface Props {
    changePage: (page: Page) => void
}

const Next: React.FC<Props> = props => {
  return (
    <div className='outer'>
      <NavBar />
      <div className='imageContainer'>
        <img src={"penguin.svg"} alt="Penguin"/>
      </div>
      <div className='backnext'>
          <button className='btn' onClick={() => props.changePage(Page.Start)}>
            &lt;Baaaaaaaaaack
          </button>
          <button className='btn' onClick={() => props.changePage(Page.Back)}>
            Next&gt;
          </button>
      </div>
    </div>
  );
}

export default Next;