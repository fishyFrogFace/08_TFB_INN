import React, { useState, useEffect } from 'react';
import './App.css';
import FrontPage from 'frontpage/FrontPage';
import Examination from 'examination/Examination';
import { Page, ExamDefinition } from './Types';
import { standardExamDefinition } from './examDefinition';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import { updateAppPage } from 'redux/actions';

const App: React.FC<PropsFromRedux> = props => {
  const [exam, setExam] = useState<ExamDefinition>(standardExamDefinition);

  useEffect(() => {
    fetch('https://api.example.com/items')
      .then(res => res.json())
      .then(
        result => {
          setExam(result.items);
        },
        error => {
          console.log(error);
        }
      );
  }, []);

  switch (props.currentPage) {
    /* fetch available examinations from local storage (or backend API) and pass
       them to FrontPage */
    case Page.FrontPage:
      return (
        <div>
          <FrontPage />
        </div>
      );

    /* fetch questions and question props from local storage (or backend API)
       and pass them to Examination */
    case Page.Examination:
      return <Examination examDefinition={exam} />;
  }
};

// Redux related:

const mapStateToProps = (store: RootState) => ({
  currentPage: store.appPage
});

const mapToDispatch = {
  updateAppPage
};

type PropsFromRedux = ReturnType<typeof mapStateToProps> & typeof mapToDispatch;

const connector = connect(mapStateToProps, mapToDispatch);

export default connector(App);
