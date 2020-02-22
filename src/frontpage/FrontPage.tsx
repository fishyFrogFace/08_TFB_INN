import React, { useState } from "react";
import '../App.css';
import './FrontPage.css'
import { Page } from '../App'
import Button from '../components/Button'
import NavBar from '../components/NavBar'

interface Examination {
  name: string,
  username: string,
  avatar: string, // should be an actual picture or link to picture
  status: string
}

interface Props {
  availableExaminations: Examination[],
  changePage: (page: Page) => void
}

/* buttons should be generated from props passed to the component
   based on available examinations */
const FrontPage: React.FC<Props> = props => {

  const [availableExaminations, setAvailableExaminations] = useState(props.availableExaminations);

  return (
    <div className="main">
      <NavBar />
      <div className='questionContainer'>
        <div className='frontpage-buttons'>
          {
            availableExaminations.map(element => {
              return <Button classNames={element.status} onClick={() => props.changePage(Page.Examination)}>
                <p className='btn-header'>{element.name}</p>
                <p className='btn-body'>{element.username}</p>
              </Button>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default FrontPage;