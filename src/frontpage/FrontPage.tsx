import React, { useState } from "react";
import '../App.css';
import './FrontPage.css'
import { Page } from '../App'
import Button from '../components/Button'
import NavBar from '../components/NavBar'

interface Examination {
  name: String,
  username: String,
  avatar: String // should be an actual picture or link to picture
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
      <div className='frontpage-buttons'>
        {
          availableExaminations.map(element => {
            return <Button onClick={() => props.changePage(Page.Examination)}>
              {element.name}
            </Button>
          })
        }
      </div>
    </div>
  );
}

export default FrontPage;