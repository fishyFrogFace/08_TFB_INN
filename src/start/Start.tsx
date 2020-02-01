import React from 'react';
import '../App.css';
import { Page } from '../App'
import Button from '../components/Button'

interface Props {
    changePage: (page: Page) => void
}

const Start: React.FC<Props> = props => {
  return (
    <div className='main'>
        <Button onClick={() => props.changePage(Page.Next)}>
          Start
        </Button>
    </div>
  );
}

export default Start;