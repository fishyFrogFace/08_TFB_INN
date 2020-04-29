import React from 'react';
import './NavBar.css';
import Button from './Button';
import exit from '../images/exit.svg';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import { ExamPage } from 'Types';

interface Props extends PropsFromRedux {
  showChoice: () => void;
}

const NavBar: React.FC<Props> = props => {
  return (
    <div className='nav-bar'>
      <div className='navbar-left'>
        <h1 className='navbar-subject'>{props.subjectTitle}</h1>
        <Button classNames='nav-btn exit' onClick={props.showChoice}>
          <img className='nav-img' src={exit} alt='Exit' />
        </Button>
      </div>
    </div>
  );
};
// Redux related:
const mapStateToProps = (store: RootState) => ({
  subjectTitle: store.examPage === ExamPage.Subject ? store.currentSubject : ''
});

type PropsFromRedux = ReturnType<typeof mapStateToProps>;

const connector = connect(mapStateToProps);

export default connector(NavBar);
