import React from 'react';
import '../App.css';
import './Pages.css';
import Button from '../components/Button';
import { ExamState, ExamPage } from '../Types';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import { setExamPage } from 'redux/actions';

interface Props extends ExamState {
  setExamPage: (page: ExamPage) => void;
}

const CompletedSubject: React.FC<Props> = ({ currentSubject, setExamPage }) => {
  return (
    <div className='questionContainer'>
      <h1 className='h1 success-header'>Du har fullført {currentSubject}!</h1>
      <Button classNames='next' onClick={() => setExamPage(ExamPage.OVERVIEW)}>
        Neste
      </Button>
    </div>
  );
};

// Redux related:
const mapStateToProps = (store: RootState) => ({
  ...store.examState
});
const mapDispatchToProps = (dispatch) => {
  return {
    setExamPage: (page: ExamPage) => dispatch(setExamPage(page))
  };
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CompletedSubject);