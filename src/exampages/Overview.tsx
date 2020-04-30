import React from 'react';
import '../App.css';
import './Pages.css';
import Button from '../components/Button';
import CircularProgressBar from '../components/CircularProgressBar';
import { updateExamPage, updateCurrentSubject } from 'redux/actions';
import { connectDispatch } from 'redux/util';
import { ExamPage } from 'Types';

export interface SubjectCompletion {
  subjectColor: string;
  title: string;
  completed: number;
  total: number;
}

interface Props extends PropsFromRedux {
  subjects: SubjectCompletion[];
  startExam: () => void;
}

const Overview: React.FC<Props> = props => {
  return (
    <div className='content'>
    <div className="questiontextContainer bluegrey-background">
      <h1 className='h2 white normal-font'>Mine temaer</h1>

    </div>
      <div className='subjectContainer whiteBackground'>
        {props.subjects.map((subject, i) => {
          return (
            <Button
              key={i}
              classNames= {'subject-btn' + ' ' + subject.subjectColor }
              onClick={() => {
                props.updateCurrentSubject(subject.title);
                props.startExam();
              }}
              disabled={subject.completed === subject.total}>
              <div className='subjectTitleContainer'>
                <p className='black normal-font'>{subject.title}</p>
              </div>
              <div className='progressCirclecontainer'>
                <CircularProgressBar
                  completed={subject.completed}
                  total={subject.total}
                />
                </div>
              
            </Button>
          );
        })}
      </div>
      <Button
        classNames='next btn'
        onClick={() => props.updateExamPage(ExamPage.Results)}>
        Se resultater
      </Button>
    </div>
  );
};

// Redux related:

const mapToDispatch = {
  updateExamPage,
  updateCurrentSubject
};

type PropsFromRedux = typeof mapToDispatch;

const connector = connectDispatch(mapToDispatch);

export default connector(Overview);
