import React, { useState } from "react";
import './App.css';
import BackNext from 'backnext/BackNext';
import Start from 'start/Start'

export enum Page {
  BackNext,
  Start
}

interface State {
  currentPage: Page
}

const App: React.FC<{}> = props => {
  const [currentPage, setCurrentPage] = useState(Page.Start);

  const changePage = (page: Page) => {
      setCurrentPage(page)
  };

  switch (currentPage) {
      case Page.Start:
          return <Start changePage={changePage} />

      case Page.BackNext:
          return <BackNext changePage={changePage} />
  }
}

export default App;