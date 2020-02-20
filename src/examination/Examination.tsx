import React, { useState } from "react";
import '../App.css';
import { Int } from '../Helpers'
import NavBar from '../components/NavBar'
import Start from '../questions/Start'

interface State {
  currentQuestion: Int,
  pages: [any]

}

const Examination: React.FC<{}> = props => {
  const getResult = () => {
    setCurrentQuestion(currentQuestion + 1)
  };

  const [pages, setPages] = useState([<Start getResult={getResult} />, <h1 className='h1'>Question component here</h1>]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <div className="outer">
      <NavBar />
      <div className='main'>
        {pages[currentQuestion]}
      </div>
    </div>
  );
}

export default Examination;