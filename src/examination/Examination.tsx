import React from 'react';
import '../App.css';
import NavBar from '../components/NavBar'

const FrontPage: React.FC<{}> = props => {
  return (
    <div className="outer">
      <NavBar />
      <div className='main'>
         <h1>Question component here</h1>
      </div>
    </div>
  );
}

export default FrontPage;