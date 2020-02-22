import React, { useState } from "react";
import '../App.css';
import { int } from '../Helpers'
import NavBar from '../components/NavBar'
import Start from '../questions/Start'
import Result from '../result/Result'

/* the list of pages will get passed to the examination by App.tsx
   as will the props needed to build questions from question components */
interface Props {
  currentQuestion: int,
  questions: string[]
}

const Examination: React.FC<Props> = props => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions] = useState(props.questions);

  const resultExample = [
    { measures: "Kan spise pizza", maxPoints: 3, pointsAchieved: 2},
    { measures: "Kan klikke på ting", maxPoints: 2, pointsAchieved: 1},
    { measures: "Kan se på TV", maxPoints: 3, pointsAchieved: 0}
  ]

  /* makes us move to the next question and will contain
     code that stores the result from the question that called it,
     passed to the function as parameters */
  const getResult = () => {
    setCurrentQuestion(currentQuestion + 1)
  };

  /* the list of pages might be represented as an enum, for easy storage.
     by matching on values in the enum, we can render the correct question component
     and fill it with values (stored in local storage or database),
     not sure how simple converting from string to enum is */
  const chooseQuestion = (question: string) => {
    switch (question) {
      case "start":
        return <Start getResult={getResult} />

      case "end":
        // TODO let app know the examination is over
        return <Result results={resultExample}/>
    }
  }

  return (
    <div className="main">
      <NavBar />
      <div className='questionContainer'>
        {chooseQuestion(questions[currentQuestion])}
      </div>
    </div>
  );
}

export default Examination;