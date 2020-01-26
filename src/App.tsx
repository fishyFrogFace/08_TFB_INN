import React, { useState } from "react";
import './App.css';
import Start from 'start/Start';
import Next from 'backnext/Next';
import Back from 'backnext/Back';

export enum Page {
  Start,
  Next,
  Back
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

      case Page.Next:
          return <Next changePage={changePage} />

      case Page.Back:
        return <Back changePage={changePage} />
  }
}

export default App;