import React from 'react';
import '../App.css';
import { Page } from '../App'
import Button from '../components/Button'
import NavBar from '../components/NavBar'

interface Props {
    changePage: (page: Page) => void
}

/* buttons should be generated from props passed to the component
   based on available examinations */
const FrontPage: React.FC<Props> = props => {
  return (
    <div className="outer">
      <NavBar />
      <div className='main'>
          <Button onClick={() => props.changePage(Page.Examination)}>
            Gerd - Lvl 1
          </Button>
      </div>
    </div>
  );
}

export default FrontPage;