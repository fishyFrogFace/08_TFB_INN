import React from 'react';
import ExaminationBlurb from './ExaminationBlurb';
import './ExaminationList.css';
import { ExamInfo, Page } from '../Types';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import { resetExamination, setAppPage } from '../redux/actions';

// PROBABLY NEEDS UPDATING, IT IS NOT VERY MUCH IN LINE WITH OUR CURRENT APPLICATION DESIGN

interface Props {
  availableExaminations: ExamInfo[];
  chooseExamination: (instanceID: number) => void;
}

const ExaminationList: React.FC<Props> = ({availableExaminations, chooseExamination}) => {
  return (
    <div className='examination-list'>
      {availableExaminations.map((examInfo, i) => {
        return (
          <ExaminationBlurb
            key={i}
            examInfo={examInfo}
            chooseExamination={chooseExamination}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (store : RootState) => ({
  availableExaminations: store.appState.availableExaminations
});
const mapDispatchToProps = (dispatch) => {
  return {
    resetExamination: () => dispatch(resetExamination()),
    chooseExamination: (instanceID: number) => {
      dispatch(resetExamination())
      dispatch(setAppPage(Page.EXAMINATION));
    }
  }
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ExaminationList);