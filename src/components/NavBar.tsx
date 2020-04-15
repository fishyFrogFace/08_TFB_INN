import React from 'react';
import './NavBar.css';
import Button from './Button';
import exit from './exit.svg';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import { ExamPage, ExamState } from 'Types';
import { setExamPage } from 'redux/actions';

interface Props extends ExamState {
  setExamPage: (page: ExamPage) => void;
}

const NavBar: React.FC<Props> = ({ currentPage, previousPage, setExamPage }) => {
  const onExit = () => {
    switch (currentPage) {
      case ExamPage.EXIT_EXAM:
      case ExamPage.QUIT_TO_OVERVIEW:
        setExamPage(previousPage);
        break;
      case ExamPage.OVERVIEW:
        setExamPage(ExamPage.EXIT_EXAM);
        break;
      default:
        setExamPage(ExamPage.QUIT_TO_OVERVIEW);
        break;
    }
  }

  return (
    <div className='navBar'>
      <div className='navbar-left'>
        <Button classNames='nav-btn exit' onClick={onExit}>
          <img className='nav-img' src={exit} alt='Exit' />
        </Button>
      </div>
    </div>
  );
};

// Redux related:
const mapStateToProps = (store: RootState) => ({
  ...store.examState
});
const mapDispatchToProps = (dispatch) => {
  return {
    setExamPage: (page: ExamPage) => dispatch(setExamPage(page)),
  };
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(NavBar);