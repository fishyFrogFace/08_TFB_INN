import React from 'react';
import '../App.css';
import { Page } from '../App'
import NavBar from '../components/NavBar'
import kitten from './kitten.svg';

interface Props {
    changePage: (page: Page) => void
}

const Back: React.FC<Props> = props => {
    return (
        <div className='outer'>
        <NavBar />
        <div className='imageContainer'>
          <img src={kitten} alt="Kitten"/>
        </div>
        <div className='backnext'>
            <button className='btn' onClick={() => props.changePage(Page.Next)}>
              &lt;Back
            </button>
            <button className='btn' onClick={() => props.changePage(Page.Back)}>
              Next&gt;
            </button>
        </div>
      </div>
    );
}

export default Back;