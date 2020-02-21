import React, { useState } from "react";
import './App.css';
import FrontPage from 'frontpage/FrontPage';
import Examination from 'examination/Examination';

export enum Page {
  Examination,
  FrontPage
}

interface State {
  currentPage: Page
}

const App: React.FC<{}> = props => {
  const [currentPage, setCurrentPage] = useState(Page.FrontPage);

  const changePage = (page: Page) => {
      setCurrentPage(page)
  };

  const example = [
                    { name: "Lvl 1", username: "Gerd", avatar: "jadda" }, 
                    { name: "Lvl 1", username: "Lise", avatar: "avatar" },
                    { name: "Lvl 1", username: "Gerd", avatar: "jadda" }, 
                    { name: "Lvl 1", username: "Lise", avatar: "avatar" },
                    { name: "Lvl 1", username: "Gerd", avatar: "jadda" }, 
                   { name: "Lvl 1", username: "Lise", avatar: "avatar" }
                  ]

  switch (currentPage) {
      case Page.FrontPage:
          /* fetch available examinations from local storage (or backend API) and pass
             them to FrontPage */
          return <FrontPage availableExaminations={example} changePage={changePage} />

          /* fetch questions and question props from local storage (or backend API)
             and pass them to Examination */
      case Page.Examination:
          return <Examination />
  }
}

export default App;