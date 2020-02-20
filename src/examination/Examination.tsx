import React, { useState } from "react";
import '../App.css';
import { Int } from '../Helpers'
import NavBar from '../components/NavBar'
import Start from '../questions/Start'

/* the list of pages will get passed to the examination by App.tsx
   as will the props needed to build questions from question components */
interface State {
  currentQuestion: Int,
  pages: [any]
}

const Examination: React.FC<{}> = props => {
  /* makes us move to the next question and will contain
     code that stores the result from the question that called it,
     passed to the function as parameters */
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